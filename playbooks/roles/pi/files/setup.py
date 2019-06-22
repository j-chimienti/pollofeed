import os, yaml

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

configPath = os.path.join(WORKING_DIR, "config.yml")

try:
    with open(configPath, 'r') as ymlfile:
        cfg = yaml.load(ymlfile)
except Exception:
    print(
        "Config file not found or invalid. Please provide a valid config.yml file. See exampleconfig.yml for reference")
    exit()

if 'Settings' in cfg:
    settings = cfg['Settings']
else:
    settings = {}
