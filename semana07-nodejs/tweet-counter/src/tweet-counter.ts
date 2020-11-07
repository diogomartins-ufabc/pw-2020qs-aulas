const ntwitter = require("ntwitter")
import {Count} from "./count"
import {credentials} from "./secrets"

const twitter = ntwitter(credentials)
const counts: Count[] = [
    {
        tag: "cool",
        frequency: 0
    }, 
    {
        tag: "awesome",
        frequency: 0
    }
]

twitter.stream(
    'statuses/filter',
    {'track' : counts.map((count) => count.tag)},
    function (stream: any) {
        stream.on('data', function (tweet: any) {
            for (const i in counts) {
                if (tweet.text.indexOf(counts[i].tag) >= 0) {
                    counts[i].frequency++
                }
            }
        });
    }
);

setInterval(function () {
    console.log(counts)
}, 3000);

export {counts}