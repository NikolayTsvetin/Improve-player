import requester from 'requester';

const cacheObj = {};

class Templates {
    loadTemplate(templateName) {
        if (cacheObj.hasOwnProperty(templateName)) {
            return Promise.resolve(cacheObj[templateName]);
        }

        return requester.getRequest(`templates/${templateName}.handlebars`)
            .then(template => {
                const compiledTemplate = Handlebars.compile(template);
                cacheObj[templateName] = compiledTemplate;
                return Promise.resolve(compiledTemplate);
            });
    }
}

const templates =  new Templates();
export default templates;