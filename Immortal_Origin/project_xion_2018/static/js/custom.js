String.prototype.format = function () {
    var args = [].slice.call(arguments);
    return this.replace(/(\{\d+\})/g, function (a) {
        return args[+(a.substr(1, a.length - 2)) || 0];
    });
};

function updateProjectList(URL) {
    try {
        $("#div_result_loader").html('');

        $.ajax({
            url: URL,
            type: 'GET',
            cache: false,
            headers: {
                'Cache-Control': 'max-age=3600'
            },
            success: function (result, status, xhr) {
                if (status == 'success') {
                    $("#div_result_loader").html(result);
                    $("img").unveil(250);
                }
            },
            error: function (data, status, errorThrown) {
                $("#div_result_loader").html('<br/><h3>No Result Found</h3><br/>');
                console.log(data, errorThrown);
            }
        });
    } catch (err) {
        $("#div_result_loader").html('<br/><h3>No Result Found</h3><br/>');
        console.log(err);
    }
}