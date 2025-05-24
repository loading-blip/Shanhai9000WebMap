import yaml
import json
import sys
import os

id=0
for i in os.listdir(sys.argv[1]):
    file_path = i
    os.makedirs(os.path.join(sys.argv[1],'json'),exist_ok=True)
    if file_path.split('.')[-1]=='yaml':
        yaml_data = yaml.load(open(os.path.join(sys.argv[1],file_path), 'r', encoding='utf-8').read(),Loader=yaml.FullLoader)
        if i != 'mark.yaml':
            #加id
            for kind in yaml_data:
                for index in range(len(yaml_data[kind])):
                        yaml_data[kind][index]['id'] = id
                        id+=1
        json_data = json.dumps(yaml_data, indent=4, ensure_ascii=False)
        open(os.path.join(sys.argv[1],'json',file_path.replace('.yaml', '.json')), 'w', encoding='utf-8').write(json_data)