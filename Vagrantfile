# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "bento/ubuntu-17.10"

  # Flask
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 8080, host: 8080

  config.vm.synced_folder ".", "/home/vagrant"
  config.vm.synced_folder ".", "/vagrant", disabled: true

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
  end

  # Provision python development environment
  config.vm.provision "shell", inline: <<-SHELL
    export HOME=/home/vagrant
    apt-get update
    apt-get install -y nodejs
    
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
    apt-get update && apt-get install yarn
    cd $HOME && yarn install

    su vagrant -c 'cd $HOME && make redis/install'

    yarn start:dev
  SHELL
end