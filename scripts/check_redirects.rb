require "jekyll"
require "json"
require "uri"
require "cgi"

destination = File.expand_path(ARGV.fetch(0, "_site"))
site = Jekyll::Site.new(Jekyll.configuration("destination" => destination))
site.reset
site.read
redirects = JSON.parse(File.read(File.join(destination, "redirects.json")))
documents = site.pages + site.collections.values.flat_map(&:docs)
expected = {}
errors = []

documents.each do |document|
  Array(document.data["redirect_from"]).each do |source|
    target = "#{site.config['url']}#{site.baseurl}#{document.url}"
    errors << "Origem duplicada: #{source}" if expected.key?(source)
    errors << "Redirecionamento para si mesmo: #{source}" if source == document.url
    expected[source] = target
    errors << "Destino não gerado: #{document.url}" unless File.file?(document.destination(destination))
  end
end

errors << "redirects.json diverge dos aliases declarados" unless redirects == expected

expected.each do |source, target|
  relative = source.delete_prefix("/")
  candidates = [relative, "#{relative}.html", File.join(relative, "index.html")]
  path = candidates.map { |entry| File.join(destination, entry) }.find { |entry| File.file?(entry) }
  unless path
    errors << "Página de redirecionamento ausente: #{source}"
    next
  end

  html = File.read(path)
  refresh = html[/<meta\s+http-equiv=["']refresh["']\s+content=["']([^"']+)["']/i, 1]
  canonical = html[/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i, 1]
  errors << "Refresh incorreto: #{source}" unless CGI.unescapeHTML(refresh.to_s) == "0; url=#{target}"
  errors << "Canonical incorreto: #{source}" unless CGI.unescapeHTML(canonical.to_s) == target
  errors << "Destino é outro alias: #{source}" if expected.key?(URI(target).path)
end

abort errors.join("\n") unless errors.empty?
puts "#{expected.length} redirecionamentos validados: aliases únicos, HTML e destinos corretos."
