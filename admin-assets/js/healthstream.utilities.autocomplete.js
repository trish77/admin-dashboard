(function (window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    window.HealthStream.utilities = window.HealthStream.utilities || {};
    var healthStream = window.HealthStream;
    var constants = healthStream.constants || {};
    var defaultIcons = {
        CheckIconSuccess: '<i class="icon success fa fa-check"></i>'
    };
    var icons = constants.icons ? $.extend({}, defaultIcons, constants.icons) : defaultIcons;

    healthStream.utilities.autocomplete = function (textbox, settings, functions) {
        settings.minLength = settings.minLength || 3;

        $(textbox).select2({
            minimumInputLength: settings.minLength,
            multiple: true,
            allowClear: true,
            placeholder: settings.placeHolderText,
            width: "100%",
            dropdownCssClass: 'select2-slats',
            ajax: {
                url: settings.ajaxUrl,
                datatype: 'json',
                type: "GET",
                contentType: "application/json",
                data: functions.getSearchParameters,
                results: function (data) {
                    return {
                        results: $.map(data, function (object) {
                            return {
                                id: object,
                                text: object
                            }
                        })
                    };
                }
            },
            formatResult: function (object, container, query, escapeMarkup) {

                var title = getSuggestionFormattedText(functions.getSuggestionTitle(object.text), query.term, escapeMarkup);

                var objectId = functions.getObjectId(object.text);
                var titleHtml = (functions.isObjectSelected(objectId) ? icons.CheckIconSuccess : "") + "</div><div class='title'>" + title;

                if (functions.getSuggestionTitleSubText) {
                    var titleSubText = getSuggestionFormattedText(functions.getSuggestionTitleSubText(object.text), query.term, escapeMarkup);
                    if (titleSubText.length) {
                        titleHtml += " <span>" + titleSubText + "</span>";
                    }
                }

                titleHtml = "<div class='action'>" + titleHtml + "</div>";

                var metaTagsHtml = "";

                var metaLabelObject = functions.getSuggestionMetaLabel(object.text);
                var metaValueObject = functions.getSuggestionMetaValue(object.text);

                if (metaLabelObject.constructor === Array && metaValueObject.constructor === Array) {
                    for (var j = 0; j < metaLabelObject.length; j++) {
                        var thisMetaValue = getSuggestionFormattedText(metaValueObject[j], query.term, escapeMarkup);
                        if (thisMetaValue.length) {
                            var thisMetaLabel = getSuggestionFormattedText(metaLabelObject[j], query.term, escapeMarkup);
                            metaTagsHtml += "<li><span class='meta-label'>" + thisMetaLabel + ":</span><span class='meta-value'>" + thisMetaValue + "</span></li>";
                        }
                    }
                } else {
                    var metaValue = getSuggestionFormattedText(metaValueObject, query.term, escapeMarkup);
                    if (metaValue.length) {
                        var metaLabel = getSuggestionFormattedText(metaLabelObject, query.term, escapeMarkup);
                        metaTagsHtml = "<li><span class='meta-label'>" + metaLabel + ":</span><span class='meta-value'>" + metaValue + "</span></li>";
                    }
                }

                if (metaTagsHtml.length) {
                    metaTagsHtml = "<ul class='meta'>" + metaTagsHtml + "</ul>";
                }

                return "<div id='slat_" + objectId + "' class='slat slat-select2 slat-select2-action slat-select2-nowrap'>" + titleHtml + metaTagsHtml + "</div>";
            },
        }).on("select2-selecting", function (e) {
            e.preventDefault();

            var object = e.choice.text;
            var objectId = functions.getObjectId(object);

            if (!functions.isObjectSelected(objectId)) {
                functions.addCallback(object);
                $(".select2-highlighted div.action").html(icons.CheckIconSuccess);
            } else {
                functions.removeCallback(object);
                $(".select2-highlighted div.action").html("");
            }
        }).on("select2-loaded", function (e) {
            if (functions.loadedCallback && functions.loadedCallback != undefined) {
                functions.loadedCallback(e);
            }
        });
    };

    function getSuggestionFormattedText(formatObject, queryTerm, escapeMarkup) {
        if (typeof formatObject == 'string') {
            return formatObject;
        } else if (typeof formatObject == 'object') {
            if (formatObject.matchQuery) {
                return matchQueryToSuggestionText(formatObject.text, queryTerm, escapeMarkup)
            } else {
                return formatObject.text;
            }
        }
        return "";
    }

    function matchQueryToSuggestionText(suggestionText, queryTerm, escapeMarkup) {
        var retVal = suggestionText;
        if (queryTerm != undefined && escapeMarkup != undefined) {
            var markup = [];
            window.Select2.util.markMatch(suggestionText, queryTerm, markup, escapeMarkup);
            retVal = markup.join("");
        }
        return retVal;
    }

    healthStream.utilities.addHiddenFieldToForm = function (name, value, form) {
        if (value) {
            var hdnField = $(document.createElement("input"));
            hdnField.attr("type", "hidden");
            hdnField.attr("name", name);
            hdnField.val(value);
            form.append(hdnField);
        }
    };

}(window, jQuery));