require 'nokogiri'
require 'csv'


trans = CSV.read("translate.csv")
headers = trans[0]

translations = {}
trans[1..-1].each do |phrase|
  p = {}
  headers[1..-1].each_with_index do |lang, i|
    p[lang] = phrase[i+1]
  end
  translations[phrase[0]] = p
end

headers[1..-1].each do |target|
  dom = Nokogiri::HTML.parse open("index.html").read()

  open("strings.en.txt", "w") do |stringsOut|
    dom.xpath('//text()').map do |txt|
      s = txt.content
      s = s.strip
      next if s == ''
      stringsOut.write s + "\n"
      
      t = translations[s]
      if t.nil?
        puts "ERROR! no text for #{s}"
      else
        puts "#{t}==#{t[target]}"
        txt.content = t[target]
      end
    end
  end


  dom.write_html_to(File.new("index.#{target}.html", 'w'), :encoding => 'UTF-8')
end
