// Youtube API Ajax call and data parse 
var channelName = 'DITPublicAffairs';
$(document).ready(function() {
    $.get(
        "https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            forUsername: channelName,
            key: 'AIzaSyB0POj3nVi1ZtUP_ZXdrX2Jyo_UXstoAGI'
        },
        function(data){
            $.each(data.items, function(i, item){
                pid = item.contentDetails.relatedPlaylists.uploads;
                getVids(pid);
            });
        }
    );
    
    function getVids(){
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                maxResults: 15,
                playlistId: pid,
                key: 'AIzaSyB0POj3nVi1ZtUP_ZXdrX2Jyo_UXstoAGI'
            },
            function(data){
                var output;
                $.each(data.items, function(i, item){
                    output = '<a href="http://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId + '" target="_blank"><div class="container" style="flex: 0 0 auto !important; width: 65%; margin: 10px; text-align: center; padding: 0;><a href="http://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId + '" target="_blank"><img src="' + item.snippet.thumbnails.medium.url + '" alt="video thumbnail" style="width: 100%;"></a><div style="padding: 10px;"><a href="http://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId + '" target="_blank"><h4 style="margin-top: 4px;">' + item.snippet.title + '</h4></a><p></p><small style="color: darkgray;">Published at: ' + item.snippet.publishedAt + '</small></div></div></a>';
                    
                    $('#result').append(output);
                    
                });
            }
        );
    }
});