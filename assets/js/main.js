document.addEventListener(
    "touchstart",
    function(){},
    true
);


    //two-way-binding 'dropdown as select' and intput field
    //eg.: <ul class="dropdown-as-select" data-linked-input="someID">
    //     <li><a href="#" data-value="value">value</a></li>
    //..
    //<input id="someID" class="linked-input" value="value" />
    $(".dropdown-as-select li a").click(function(){
        var $dropdown = $(this).parents(".dropdown"),
            $dropdownButton = $dropdown.find('.btn'),
            $linkedInput = $('#' + $(this).parents(".dropdown-as-select").data('linked-input'));

        $dropdownButton.html($(this).text() + ' <span class="caret"></span>');
        $dropdownButton.val($(this).data('value'));
        $linkedInput.val($(this).data('value'));

        $dropdown.find('li').removeClass('selected');
        $(this).parent('li').addClass('selected');
    });

    function setDropdownsValue() {
        var $linkedInputs = $('.linked-input');

        $linkedInputs.each(function( index ) {
            var $this = $(this),
                id = $this.attr('id'),
                value = $this.val(),
                $dropdownAsSelect = $("[data-linked-input='" + id + "']"),
                $link = $dropdownAsSelect.find("[data-value='" + value + "']");

            if ($link.length > 0) {
                $dropdownAsSelect.find('li').removeClass('selected');
                $link.parent('li').addClass('selected');
                $link.click();
            }
        });
    }//end of two-way-binding 'dropdown as select' and intput field

    function getURLParameters() {
        var url = window.location.href,
            result = [],
            searchIndex = url.indexOf("?");

        if (searchIndex == -1 ) return result;

        var sPageURL = url.substring(searchIndex +1),
            sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            result[i] = decodeURIComponent(sURLVariables[i].replace(/\+/g, '%20'));
        }
        return result;
    }

    function setExFormStateFromUrl() {
        var urlParams = getURLParameters(),
            usedParams = 0;
        for (var i = 0; i < urlParams.length; i++) {
            var sParameter = urlParams[i].split('='),
                sValue = sParameter[1],
                sName = sParameter[0];

            if(sValue.length > 0) {
                if(sName === 'post_type') {
                    $('input[value="' + sValue + '"]').prop('checked', true);
                    usedParams++;
                }

                if(sName === 'region_type') {
                    $('input[value="' + sValue + '"]').prop('checked', true);
                    usedParams++;
                }

                if(sName === 'region_value') {
                    $('input[name="region_value"]').val(sValue);
                    usedParams++
                }

                if(sName === 'declaration_year')  {
                    $('input[name="declaration_year"]').val(sValue);
                    usedParams++
                }

                if(sName === 'doc_type') {
                    $('input[name="doc_type"]').val(sValue);
                    usedParams++
                }
            }
        }

        if(window.location.hash) {
            var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character

            if(hash === 'exsearch') {
                usedParams++;
            }
        }

        if(usedParams > 0) {
            $('#ex-search-form').addClass('ex-search');
            $('#collapseExSearch').addClass('in');
            $(".ex-search-link").attr("aria-expanded","true");
        }

        $(".ex-search-link").click(function(){
            $(this).hide(400);
        });

        $(document).on('click', '#clear-filters', function(){
            $('input[name="declaration_year"]').val('');
            $('input[name="doc_type"]').val('');
            $('input[name="region_value"]').val('');
            setDropdownsValue();
            $(":checked").attr('checked', false);
        });

        $(document).on('submit', '#ex-form', function(){
            if (!$('input[name="declaration_year"]').val()) {
                $('input[name="declaration_year"]').remove();
            }

            if (!$('input[name="doc_type"]').val()) {
                $('input[name="doc_type"]').remove();
            }

            if (!$('input[name="region_value"]').val()) {
                $('input[name="region_value"]').remove();
            }
        });
    }

    function populateSVGmap() {
        var $container = $('#ua-map .svg-image'),
            json = $container.data('json'),
            $svgPaths = $container.find('svg path');

        $.getJSON( json, {format: "json"})
            .done(function( data ) {
                $svgPaths.each(function( index ) {
                    var $this = $(this),
                        id = $this.attr('id');

                    $this.addClass('popover-dismiss').css('cursor', 'pointer');

                    for(var i=0; i< data.length; i++) {
                        if (id == data[i].oblast) {
                            $this.attr('data-oblast', data[i].oblast ).attr('data-pep', data[i].pep ).attr('data-posipak', data[i].posipak ).attr('data-oid', data[i].id ).attr('data-something', data[i].something );
                        }
                    }

                    $('.popover-dismiss').popover({
                        html: true,
                        placement: 'top',
                        container: 'body',
                        animation: false,
                        title: function() {
                            var popoverHTML = $(this).data('oblast');
                            return popoverHTML;
                        },
                        content: function() {
                            var popoverHTML = '<a href="http://google.com">test link</a>' ;
                            popoverHTML = popoverHTML + $(this).data('posipak');
                            return popoverHTML;
                        }
                    });
                });
            });
    }

$(document).on('show.bs.popover', function() {
    $('.popover').not(this).popover('hide');
});

    $('#ua-map svg path').mouseenter(function() {
        $(this).attr('fill', '#ccc');
    }).mouseleave(function() {
        $(this).attr('fill', '#000');
    });

    $(document).ready(function() {
        populateSVGmap();

        //setExFormStateFromUrl();
        //setDropdownsValue();

        /*$(".search-name").typeahead({
            minLength: 2,
            autoSelect: false,
            source: function(query, process) {
                $.get('/ajax/suggest', {"q": query})
                    .success(function(data){
                        process(data);
                    })
            },
            matcher: function() {
                return true;
            }
        });

        $('.search-name').on('keydown', function(e) {
            if (e.keyCode == 13) {
                var ta = $(this).data('typeahead'),
                    val = ta.$menu.find('.active').data('value');
                if (val)
                    $(this).val(val);
                $(this.form).submit();
            }
        });*/
    });



