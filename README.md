# pollofeed.com

Pollofeed is a bitcoin lightning powered chicken feeder.

A Raspberry Pi recieves event that invoice is paid, and controls the feeder



### Develop

**build**

  ./build.sh
  
**start**

  ./start.sh
  
**deploy**

  You can deploy the webapp and to the Pi
  
  requirements:
   - ansible
   
   cp ./playbooks/hosts.example ./playbooks/hosts
   
  ./deploy.sh
  
