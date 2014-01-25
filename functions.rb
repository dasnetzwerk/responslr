module Sass::Script::Functions
	def inline_svg(path, color)
		path = path.value

		# Get file content
		real_path = File.join(Compass.configuration.images_path, path)

	   	if File.readable?(real_path)
			filecontent = File.open(real_path, "rb") {|io| io.read}
		else
			raise Compass::Error, "File not found or cannot be read: #{real_path}"
		end

		# Minify
		filecontent 	= filecontent.gsub("\n", "")
		filecontent 	= filecontent.gsub("\r", "")
		filecontent 	= filecontent.sub(%r{<!--(.+)-->}, '')
		filecontent 	= filecontent.sub(%r{.*(<svg.+</svg>).*}, '\1')
		filecontent 	= filecontent.sub(%r{(<svg.*?)style=".*?"(.*>)}, '\1\2')
		filecontent 	= filecontent.gsub("\t", "\s")
		filecontent 	= filecontent.sub(%r{\s{2,}}, "\s")

		# Add fill color
		unless color.is_a?(Sass::Script::Null)
			filecontent 	= filecontent.sub(%r{<svg}, "<svg style=\"fill:#{color};\"")
		end

		# Create base64 string
		filecontent 	= [filecontent].flatten.pack('m').gsub("\n","")
   		url = "url('data:image/svg+xml;base64,#{filecontent}')"

   		# Create sass string
	  	Sass::Script::String.new(url)
	end
end