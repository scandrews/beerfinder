var handlebarsData = {
    cats: [
        {
            name: 'sunshine'
        }
    ],
    dogs: [
        {
            name: 'max'
        }
    ],
    shouldShowDogs: false,
    shouldShowCats: true
};

res.render('pets', handlebarsData);

// Handlebars
{{#if shouldShowCats}}
    {{#each cats}}
    {{/each}}
{{/if}}

{{#if shouldShowDogs}}
    {{#each dogs}}
    {{/each}}
{{/if}}
```