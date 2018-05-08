            $(document).ready(function () {
                //Tell the function where the feed is located
                $.getJSON("http://localhost:8888/php/get-tweets1.1.php", function (data) {
                    //Grab each of the "entries"
                    var tweets = '';
                    $.each(data, function (i, item) {
                        //Create the links and throw them
                        //into the body of the page
                        tweets += '<table class="container"><tr><td><img src="' +
                            item.user.profile_image_url +
                            '" alt="DIT SU" class="profile-image" style="border: 1px solid darkgray;"/></td><td><div class="tweet-text"><p class="twitter-name"><b>' +
                            item.user.name +
                            '</b> · ' +
                            item.user.screen_name +
                            '</p><p class="tweet-text">' + twitify(item.text) +
                            '</p><small class="timestamp">' + item.created_at +
                            '</small></td></tr></table>'
                    });
                    $("#tweets").html(tweets);
                });
                // Converts some of the data to links
                function twitify(text) {
                    // replace urls with linked ones
                    var t2 = text.replace(/(http|https)(:\/\/)([^ )]+)/ig, '<a href="$1$2$3">$1$2$3</a>');
                    // replace @username with clickable twitter link
                    t2 = t2.replace(/@([^ ]+)/gi, '<a href="http://twitter.com/$1">@$1</a>');
                    // replace hashtags with Twitter searches
                    t2 = t2.replace(/#([^ ]+)/gi, '<a href="http://search.twitter.com/search?q=%23$1">#$1</a>');
                    return t2;
                }
            });
