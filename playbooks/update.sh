#!/usr/bin/env bash
ansible-playbook -v -i hosts --tags redeploy play.yml

# --limit
