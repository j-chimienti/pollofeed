#!/usr/bin/env bash
ansible-playbook playbooks/deploy.yml --tags git,reboot #,cron,env_files,

#ansible-playbook --limit $PI_HOST \
#playbooks/pi.yml \
#--tags git,install,config,tunnel,service
