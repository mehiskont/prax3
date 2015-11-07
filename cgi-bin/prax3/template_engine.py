import os
from string import Template

basepath = os.path.dirname(__file__)
template_path = os.path.abspath(os.path.join(basepath, "..","..","prax3"))


class TemplateEngine:
    def __init__(self, template_file, **kwargs):
        filepath = os.path.abspath(os.path.join(template_path, template_file)) + '.html'
        with open(filepath) as fp:
            html = fp.read().replace('\n', '')
        self.s = Template(html).substitute(kwargs)

    def __str__(self):
        return self.s
