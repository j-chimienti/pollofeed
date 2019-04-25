#!/usr/bin/env bash
ansible-playbook -v -i hosts --tags --limit 45.56.122.140 redeploy play.yml
