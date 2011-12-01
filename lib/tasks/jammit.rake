namespace :jammit do
  desc "Runs Jammits package command to compile the JST template files"
  task :package => :environment do
    puts "\n\nRunning Jammits package command... "
    require 'jammit'
    Jammit.package!
    puts "Done.\n\n"
  end
end
