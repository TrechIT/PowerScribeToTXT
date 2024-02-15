const fs = require('fs');
const xml2js = require('xml2js');

const xmlData = `
------PAST XML File Contents HERE -----------
`;

// Parse XML data to JavaScript object
xml2js.parseString(xmlData, { mergeAttrs: true, explicitArray: false }, (err, result) => {
    if (err) {
        console.error('Error parsing XML:', err);
        return;
    }

    // Extract AutoText entries
    const autoTexts = result.PortalAutoTextExport.AutoText;

    // Iterate through each AutoText entry
    autoTexts.forEach(autoText => {
        const name = autoText.Name.replace(/[^a-zA-Z0-9\s]/g, '');
        const contentText = autoText.ContentText;
        // Create a text file for each ContentText with the corresponding Name as the file name
        fs.writeFileSync(`Files\\${name}.txt`, contentText);
        console.log(`File created: ${name}.txt`);
    });
});