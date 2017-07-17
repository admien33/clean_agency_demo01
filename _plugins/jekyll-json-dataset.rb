require 'json'

# from https://gist.github.com/esmevane/01ae111d292796e22e1e

module Jekyll

  module JsonContent   

    class Page < Jekyll::Page
      attr_reader :post

      def initialize site, base, dir, post
        @site = site
        @base = base
        @dir  = dir
        @name = 'test' 
        # post.data.fetch('name')
        @post = post
        self.process @name
        self.read_yaml File.join(base, '_layouts'), 'api.json'
      end

      def permalink
        "#{post.id}.json"
      end

      def output
        Hash.new.tap do |hash|
          hash[:post]     = { title: post.data["title"], content: post.content }        
        end.to_json
      end

    end    

  end

  class JsonPageGenerator < Generator
    safe true

    def generate(site)
      dir = site.config.fetch('destination')

      # site.posts.docs.each do |post|
      #   site.pages << JsonContent::Page.new(site, site.source, dir, post)
      # end

      for coll_name, coll_data in site.collections
        if( !coll_data.nil? && coll_name == 'coll_dataset')
          coll_data.docs.each do |post|
            site.pages << JsonContent::Page.new(site, site.source, dir, post)
          end
        end
      end

    end

  end

end