# Automated Deployment with Ansible

### Tasks & Playbooks

1. DNS


register DNS subdomain

    ansible-playbook play.yml -i hosts --limit X.X.X.X -v --tags register_subdomain 

 
1. BTCPAYSERVER


setup
    
    ansible-playbook play.yml -i hosts --limit X.X.X.X -v --tags setup

install

    ansible-playbook play.yml -i hosts --limit X.X.X.X -v --tags install

redeploy

    ansible-playbook play.yml -i hosts --limit X.X.X.X -v --tags redeploy
