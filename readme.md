# MMD Case | Diversa Accessibility Project

## Sitemap

The project should, as a minimum, implement the following sitemap:

![mmd-sitemap](https://github.com/charlie-tango/mmd-case-24/assets/3764345/624ffa85-0e85-4020-9231-f8c46e43b376)



## Assets

To help you get started, we have provided you with a set of assets to use in the project.

###  Colors

Our designers have provided a color palette for the project. 
You can use the following CSS variables as a baseline to style the project - **But don't let it limit you!**

If you prefer to use a different color palette, feel free to do so - But make sure to define it with CSS variables, and that it is accessible.

```css
:root {
  /* colors */
  --colors-brand-beige-00: #fefefb;
  --colors-brand-beige-10: #f7f6e8; /* Background */
  --colors-brand-turquoise-00: #e6fafe;
  --colors-brand-turquoise-20: #b4f1fd;
  --colors-brand-turquoise-50: #69e3fc; /* Brand */
  --colors-brand-yellow-40: #ffea80; /* Brand */
  --colors-brand-yellow-100: #e5c000;
  --colors-brand-orange-70: #ff7733; /* Brand */
  --colors-grey-00: #ffffff;
  --colors-grey-20: #cccccc;
  --colors-grey-40: #999999;
  --colors-grey-60: #666666;
  --colors-grey-80: #333333;
  --colors-grey-100: #000000;
}
```
### Fonts

You can use these two fonts for the building the case. They compliment each other nicely, and are both available from Google Fonts.

* [Poppins](https://fonts.google.com/specimen/Poppins) a sans-serif font
* [Libre Baskerville](https://fonts.google.com/specimen/Libre+Baskerville) a classic looking serif font

Libre Baskerville looks good in headlines and presentational text, while Poppins is a good choice for body text.

Read up on how to use [custom Fonts in a Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/fonts).

### Assets

- `/assets/diversa.svg` - The logo for the client
- `/assets/diversa_icon.svg` - The square logo for the client
- `/assets/icon.svg` - `.svg` favicon for the project. It can be copied into the `/app` folder of a Next.js project.
- `/assets/favicon.ico` - Fallback `.ico` favicon for the project. It can be copied into the `/app` folder of a Next.js project.

## Axe report

## Endpoints

The endpoints you should use can be accessed on `https://mmd-a11y-api.app/`.

### GET `/api/scan`

Scan a given URL with axe-core and return the results. In will boot up a headless Chrome browser, that will run the accessibility tests on the given URL.
This takes some time, so expect a new scan to take 5-15 seconds to complete.

Look inside the [/examples](./examples) folder, for static JSON files with example responses.
You can use these if you want a static output of data, or if the API is failing.

> **Note:**<br> Rate limiting is enabled on this endpoint to prevent abuse.
> This only limits the amount of new scans that can be started within a given time frame.

#### Query parameters

| Name   | Type     | Description                                                                                                        |
| ------ | -------- |--------------------------------------------------------------------------------------------------------------------|
| `url`  | string   | The URL to scan.                                                                                                   |
| `tags` | string[] | The tags for the rules to execute. Use either a comma-separated list of tags, or multiple `tags` query parameters. |

##### Valid tags

- `wcag2a`
- `wcag2aa`
- `wcag2aaa`
- `wcag21a`
- `wcag21aa`
- `wcag22aa`
- `best-practice`
- `ACT`

#### Example request

```ts
const params = new URLSearchParams({
  url: "https://www.charlietango.dk",
});
const response = await fetch(
  `https://mmd-a11y-api.app/api/scan?${params.toString()}`,
);
const data = await response.json();
```

With custom tags:

```ts
const params = new URLSearchParams({
  url: "https://www.charlietango.dk",
  tags: ["wcag2a", "wcag2aa", "ACT"],
});
const response = await fetch(
  `https://mmd-a11y-api.vercel.app/api/scan?${params.toString()}`,
);
const data = await response.json();
```

#### Result

The result is a JSON object with the following properties, coming from the [axe-core](https://github.com/dequelabs/axe-core/) results:

![report](https://github.com/charlie-tango/mmd-case-24/assets/3764345/ecc6f61f-eaff-4966-87f3-dd8629ccd15e)

- `url` The URL of the page that was tested.
- `timestamp` - The date and time that analysis was completed.
- `tags` - The tags for the rules that were executed.
- `screenhot` - A snapshot of the page that was tested. You can use this to showcase to the user, what the scanner saw.
    - `url` - Url to the image
    - `width` - Width of the image
    - `height` - Height of the image
- `results` The results of axe are grouped according to their outcome into the following arrays:
    - `passes`: These results indicate what elements passed the rules
    - `violations`: These results indicate what elements failed the rules
    - `inapplicable`: These results indicate which rules did not run because no matching content was found on the page. For example, with no video, those rules won't run.
    - `incomplete`: Also known as "needs review," these results were aborted and require further testing. This can happen either because of technical restrictions to what the rule can test, or because a javascript error occurred.

Each object returned in these arrays have the following properties:

![violations](https://github.com/charlie-tango/mmd-case-24/assets/3764345/4fcb1574-bfd3-4245-84a9-08fd3337ba44)

- `description` - Text string that describes what the rule does
- `help` - Help text that describes the test that was performed
- `helpUrl` - URL that provides more information about the specifics of the violation. Links to a page on the Deque University site.
- `id` - Unique identifier for the rule; [see the list of rules](https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md)
- `impact` - How serious the violation is. Can be one of "minor", "moderate", "serious", or "critical" if the Rule failed or `null` if the check passed
- `tags` - Array of tags that this rule is assigned.
- `nodes` - Array of all elements the Rule tested
    - `html` - Snippet of HTML of the Element
    - `impact` - How serious the violation is. Can be one of "minor", "moderate", "serious", or "critical" if the test failed or `null` if the check passed
    - `target` - Array of either strings or Arrays of strings. If the item in the array is a string, then it is a CSS selector. If there are multiple items in the array each item corresponds to one level of iframe or frame. If there is one iframe or frame, there should be two entries in `target`. If there are three iframe levels, there should be four entries in `target`. If the item in the Array is an Array of strings, then it points to an element in a shadow DOM and each item (except the n-1th) in this array is a selector to a DOM element with a shadow DOM. The last element in the array points to the final shadow DOM node.
    - `any` - Array of checks that were made where at least one must have passed. Each entry in the array contains:
        - `id` - Unique identifier for this check. Check ids may be the same as Rule ids
        - `impact` - How serious this particular check is. Can be one of "minor", "moderate", "serious", or "critical". Each check that is part of a rule can have different impacts. The highest impact of all the checks that fail is reported for the rule
        - `message` - Description of why this check passed or failed
        - `data` - Additional information that is specific to the type of Check which is optional. For example, a color contrast check would include the foreground color, background color, contrast ratio, etc.
        - `relatedNodes` - Optional array of information about other nodes that are related to this check. For example, a duplicate id check violation would list the other selectors that had this same duplicate id. Each entry in the array contains the following information:
            - `target` - Array of selectors for the related node
            - `html` - HTML source of the related node
    - `all` - Array of checks that were made where all must have passed. Each entry in the array contains the same information as the 'any' array
    - `none` - Array of checks that were made where all must have not passed. Each entry in the array contains the same information as the 'any' array

### Debugging

You can use a [browser extension for Axe](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd), 
if you'd like to get a more visual representation of an Axe result. 
It's the same core tool they are using to generate this data, as the endpoint you are going to use, so you should see the same results.
