function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

// Set 946 to your max page count on the front page
var pid = getRandomIntInclusive(0, 946)
console.log(pid)
var domain = ""
if (window.location.href.startsWith("https://e-hentai.org")){
    domain = "https://e-hentai.org"
} else if (window.location.href.startsWith("https://exhentai.org")){
    domain = "https://exhentai.org"
}
fetch(domain + "/?page=" + pid, {headers: [
        ['charset', 'utf-8'],
    ]})
    .then(response => response.text())
    .then((response) => {
        var links = null
        if (response.includes("<table class=\"itg gltm\">")){
            //Minimal
            console.log("Minimal mode")
            links = response.split("<td class=\"gl3m glname\"")
            links.splice(0, 1)
            var cl = []
            for (const l of links) {
                var t = l.split("><a href=\"")[1]
                cl.push(t)
            }
            links = cl
        } else if (response.includes("<table class=\"itg gltc\">")) {
            //Compact
            console.log("Compact mode")
            links = response.split("<td class=\"gl3c glname\"")
            links.splice(0, 1)
            var cl = []
            for (const l of links) {
                var t = l.split("><a href=\"")[1]
                cl.push(t)
            }
            links = cl
        } else if (response.includes("<table class=\"itg glte\">")) {
            //Extended
            console.log("Extended mode")
            links = response.split("<td class=\"gl1e\"")
            links.splice(0, 1)
            var cl = []
            for (const l of links) {
                var t = l.split("><a href=\"")[1]
                cl.push(t)
            }
            links = cl
        } else if (response.includes("<div class=\"itg gld\">")) {
            //Thumbnail
            console.log("Thumbnail mode")
            links = response.split("<div class=\"gl1t\"><a href=\"")
            links.splice(0, 1)

        }

        var lid = getRandomIntInclusive(0, links.length - 1)
        var link = links[lid]
        var link = link.split("\"")[0]
        console.log(link)
        window.open(link, "_blank")
    }
)