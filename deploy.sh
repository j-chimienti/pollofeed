#!/usr/bin/env bash
ansible-playbook --limit 45.56.122.140 \
playbooks/deploy.yml \
--tags git,cron #,reboot # ,cron,env_files,


