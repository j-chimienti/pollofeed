#!/usr/bin/env bash
ansible-playbook -v --limit 45.56.122.140 \
playbooks/play.yml \
--tags git,reboot # ,cron,env_files,


