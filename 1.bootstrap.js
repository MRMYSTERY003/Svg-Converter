(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vtracer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vtracer */ \"./node_modules/vtracer/vtracer_webapp.js\");\n\r\n\r\nlet runner;\r\nconst canvas = document.getElementById('frame');\r\nconst ctx = canvas.getContext('2d');\r\nconst svg = document.getElementById('svg');\r\nconst img = new Image();\r\nconst progress = document.getElementById('progressbar');\r\nconst progressregion = document.getElementById('progressregion');\r\nlet mode = 'spline', clustering_mode = 'color', clustering_hierarchical = 'cutout';\r\n\r\n// Hide canas and svg on load\r\ncanvas.style.display = 'none';\r\nsvg.style.display = 'none';\r\n\r\n// Paste from clipboard\r\ndocument.addEventListener('paste', function (e) {\r\n    if (e.clipboardData) {\r\n        var items = e.clipboardData.items;\r\n\r\n        if (!items) return;\r\n\r\n        //access data directly\r\n        for (var i = 0; i < items.length; i++) {\r\n            if (items[i].type.indexOf(\"image\") !== -1) {\r\n                //image\r\n                var blob = items[i].getAsFile();\r\n                var URLObj = window.URL || window.webkitURL;\r\n                var source = URLObj.createObjectURL(blob);\r\n                setSourceAndRestart(source);\r\n            }\r\n        }\r\n        e.preventDefault();\r\n    }\r\n});\r\n\r\n// Download as SVG\r\ndocument.getElementById('export').addEventListener('click', function (e) {\r\n    const blob = new Blob([new XMLSerializer().serializeToString(svg)], {type: 'octet/stream'}),\r\n    url = window.URL.createObjectURL(blob);\r\n\r\n    this.href = url;\r\n    this.target = '_blank';\r\n\r\n    this.download = 'export-' + new Date().toISOString().slice(0, 19).replace(/:/g, '').replace('T', ' ') + '.svg';\r\n});\r\n\r\n\r\n// Function to load a given config WITHOUT restarting\r\nfunction loadConfig(config) {\r\n    mode = config.mode;\r\n    clustering_mode = config.clustering_mode;\r\n    clustering_hierarchical = config.clustering_hierarchical;\r\n\r\n    globalcorner = config.corner_threshold;\r\n    document.getElementById('cornervalue').innerHTML = globalcorner;\r\n    document.getElementById('corner').value = globalcorner;\r\n    \r\n    globallength = config.length_threshold;\r\n    document.getElementById('lengthvalue').innerHTML = globallength;\r\n    document.getElementById('length').value = globallength;\r\n    \r\n    globalsplice = config.splice_threshold;\r\n    document.getElementById('splicevalue').innerHTML = globalsplice;\r\n    document.getElementById('splice').value = globalsplice;\r\n\r\n    globalfilterspeckle = config.filter_speckle;\r\n    document.getElementById('filterspecklevalue').innerHTML = globalfilterspeckle;\r\n    document.getElementById('filterspeckle').value = globalfilterspeckle;\r\n\r\n    globalcolorprecision = config.color_precision;\r\n    document.getElementById('colorprecisionvalue').innerHTML = globalcolorprecision;\r\n    document.getElementById('colorprecision').value = globalcolorprecision;\r\n\r\n    globallayerdifference = config.layer_difference;\r\n    document.getElementById('layerdifferencevalue').innerHTML = globallayerdifference;\r\n    document.getElementById('layerdifference').value = globallayerdifference;\r\n\r\n    globalpathprecision = config.path_precision;\r\n    document.getElementById('pathprecisionvalue').innerHTML = globalpathprecision;\r\n    document.getElementById('pathprecision').value = globalpathprecision;\r\n}\r\n\r\n\r\n\r\n// Upload button\r\nvar imageSelect = document.getElementById('imageSelect'),\r\nimageInput = document.getElementById('imageInput');  \r\nimageSelect.addEventListener('click', function (e) {\r\n    imageInput.click();\r\n    e.preventDefault();\r\n});\r\n\r\nimageInput.addEventListener('change', function (e) {\r\n    setSourceAndRestart(this.files[0]);\r\n});\r\n\r\n// Drag-n-Drop\r\nvar drop = document.getElementById('drop');\r\nvar droptext = document.getElementById('droptext');\r\ndrop.addEventListener('dragenter', function (e) {\r\n    if (e.preventDefault) e.preventDefault();\r\n    e.dataTransfer.dropEffect = 'copy';\r\n    droptext.classList.add('hovering');\r\n    return false;\r\n});\r\n\r\ndrop.addEventListener('dragleave', function (e) {\r\n    if (e.preventDefault) e.preventDefault();\r\n    e.dataTransfer.dropEffect = 'copy';\r\n    droptext.classList.remove('hovering');\r\n    return false;\r\n});\r\n\r\ndrop.addEventListener('dragover', function (e) {\r\n    if (e.preventDefault) e.preventDefault();\r\n    e.dataTransfer.dropEffect = 'copy';\r\n    droptext.classList.add('hovering');\r\n    return false;\r\n});\r\n\r\ndrop.addEventListener('drop', function (e) {\r\n    if (e.preventDefault) e.preventDefault();\r\n    droptext.classList.remove('hovering');\r\n    setSourceAndRestart(e.dataTransfer.files[0]);\r\n    return false;\r\n});\r\n\r\n// Get Input from UI controls\r\nvar globalcorner = parseInt(document.getElementById('corner').value),\r\n    globallength = parseFloat(document.getElementById('length').value),\r\n    globalsplice = parseInt(document.getElementById('splice').value),\r\n    globalfilterspeckle = parseInt(document.getElementById('filterspeckle').value),\r\n    globalcolorprecision = parseInt(document.getElementById('colorprecision').value),\r\n    globallayerdifference = parseInt(document.getElementById('layerdifference').value),\r\n    globalpathprecision = parseInt(document.getElementById('pathprecision').value);\r\n\r\n\r\nif (localStorage.VSsettings) {\r\n    var settings = JSON.parse(localStorage.VSsettings);\r\n    document.getElementById('cornervalue').innerHTML = document.getElementById('corner').value = globalcorner = settings.globalcorner;\r\n    document.getElementById('lengthvalue').innerHTML = document.getElementById('length').value = globallength = settings.globallength;\r\n    document.getElementById('splicevalue').innerHTML = document.getElementById('splice').value = globalsplice = settings.globalsplice;\r\n}\r\n\r\n\r\ndocument.getElementById('none').addEventListener('click', function (e) {\r\n    mode = 'none';\r\n    restart();\r\n}, false);\r\n\r\ndocument.getElementById('polygon').addEventListener('click', function (e) {\r\n    mode = 'polygon';\r\n    restart();\r\n}, false);\r\n\r\ndocument.getElementById('spline').addEventListener('click', function (e) {\r\n    mode = 'spline';\r\n    restart();\r\n}, false);\r\n\r\ndocument.getElementById('clustering-binary').addEventListener('click', function (e) {\r\n    clustering_mode = 'binary';\r\n    restart();\r\n}, false);\r\n\r\ndocument.getElementById('clustering-color').addEventListener('click', function (e) {\r\n    clustering_mode = 'color';\r\n    restart();\r\n}, false);\r\n\r\ndocument.getElementById('clustering-cutout').addEventListener('click', function (e) {\r\n    clustering_hierarchical = 'cutout';\r\n    restart();\r\n}, false);\r\n\r\ndocument.getElementById('clustering-stacked').addEventListener('click', function (e) {\r\n    clustering_hierarchical = 'stacked';\r\n    restart();\r\n}, false);\r\n\r\ndocument.getElementById('filterspeckle').addEventListener('change', function (e) {\r\n    globalfilterspeckle = parseInt(this.value);\r\n    document.getElementById('filterspecklevalue').innerHTML = this.value;\r\n    restart();\r\n});\r\n\r\ndocument.getElementById('colorprecision').addEventListener('change', function (e) {\r\n    globalcolorprecision = parseInt(this.value);\r\n    document.getElementById('colorprecisionvalue').innerHTML = this.value;\r\n    restart();\r\n});\r\n\r\ndocument.getElementById('layerdifference').addEventListener('change', function (e) {\r\n    globallayerdifference = parseInt(this.value);\r\n    document.getElementById('layerdifferencevalue').innerHTML = this.value;\r\n    restart();\r\n});\r\n\r\ndocument.getElementById('corner').addEventListener('change', function (e) {\r\n    globalcorner = parseInt(this.value);\r\n    document.getElementById('cornervalue').innerHTML = this.value;\r\n    restart();\r\n});\r\n\r\n\r\n\r\ndocument.getElementById('length').addEventListener('change', function (e) {\r\n    globallength = parseFloat(this.value);\r\n    document.getElementById('lengthvalue').innerHTML = this.value;\r\n    restart();\r\n});\r\n\r\ndocument.getElementById('splice').addEventListener('change', function (e) {\r\n    globalsplice = parseInt(this.value);\r\n    document.getElementById('splicevalue').innerHTML = this.value;\r\n    restart();\r\n});\r\n\r\ndocument.getElementById('pathprecision').addEventListener('change', function (e) {\r\n    globalpathprecision = parseInt(this.value);\r\n    document.getElementById('pathprecisionvalue').innerHTML = this.value;\r\n    restart();\r\n});\r\n\r\n// Save inputs before unloading\r\n\r\n\r\nwindow.addEventListener('beforeunload', function () {\r\n    localStorage.VSsettings = JSON.stringify({\r\n        globalcorner: globalcorner,\r\n        globallength: globallength,\r\n        globalsplice: globalsplice,\r\n    });\r\n});\r\n\r\n\r\nfunction setSourceAndRestart(source) {\r\n    img.src = source instanceof File ? URL.createObjectURL(source) : source;\r\n    img.onload = function () {\r\n        const width = img.naturalWidth, height = img.naturalHeight;\r\n        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);\r\n\r\n        drop.style.height = height;     \r\n        canvas.width = img.naturalWidth;\r\n        canvas.height = img.naturalHeight;\r\n        if (height > width) {\r\n            document.getElementById('canvas-container').style.width = '50%';\r\n            document.getElementById('canvas-container').style.marginBottom = (height / width * 50) + '%';\r\n        } else {\r\n            document.getElementById('canvas-container').style.width = '';\r\n            document.getElementById('canvas-container').style.marginBottom = (height / width * 100) + '%';\r\n        }\r\n        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);\r\n        ctx.getImageData(0, 0, canvas.width, canvas.height);\r\n        restart();\r\n    }\r\n    // Show display\r\n    canvas.style.display = 'block';\r\n    svg.style.display = 'block';\r\n\r\n    // Hide upload text \r\n    \r\n    droptext.style.display = 'none';\r\n}\r\n\r\nfunction restart() {\r\n    document.getElementById('clustering-binary').classList.remove('selected');\r\n    document.getElementById('clustering-color').classList.remove('selected');\r\n    document.getElementById('clustering-' + clustering_mode).classList.add('selected');\r\n    Array.from(document.getElementsByClassName('clustering-color-options')).forEach((el) => {\r\n        el.style.display = clustering_mode == 'color' ? '' : 'none';\r\n    });\r\n\r\n    document.getElementById('clustering-cutout').classList.remove('selected');\r\n    document.getElementById('clustering-stacked').classList.remove('selected');\r\n    document.getElementById('clustering-' + clustering_hierarchical).classList.add('selected');\r\n\r\n    document.getElementById('none').classList.remove('selected');\r\n    document.getElementById('polygon').classList.remove('selected');\r\n    document.getElementById('spline').classList.remove('selected');\r\n    document.getElementById(mode).classList.add('selected');\r\n    Array.from(document.getElementsByClassName('spline-options')).forEach((el) => {\r\n        el.style.display = mode == 'spline' ? '' : 'none';\r\n    });\r\n\r\n    if (!img.src) {\r\n        return;\r\n    }\r\n    while (svg.firstChild) {\r\n        svg.removeChild(svg.firstChild);\r\n    }\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n    ctx.drawImage(img, 0, 0);\r\n    console.log(img)\r\n    let converter_params = JSON.stringify({\r\n        'canvas_id': canvas.id,\r\n        'svg_id': svg.id,\r\n        'mode': mode,\r\n        'clustering_mode': clustering_mode,\r\n        'hierarchical': clustering_hierarchical,\r\n        'corner_threshold': deg2rad(globalcorner),\r\n        'length_threshold': globallength,\r\n        'max_iterations': 10,\r\n        'splice_threshold': deg2rad(globalsplice),\r\n        'filter_speckle': globalfilterspeckle*globalfilterspeckle,\r\n        'color_precision': 8-globalcolorprecision,\r\n        'layer_difference': globallayerdifference,\r\n        'path_precision': globalpathprecision,\r\n    });\r\n    if (runner) {\r\n        runner.stop();\r\n    }\r\n    runner = new ConverterRunner(converter_params);\r\n    progress.value = 0;\r\n    progressregion.style.display = 'block';\r\n    progressregion.style.marginBottom = '20px';\r\n    runner.run();\r\n}\r\n\r\n\r\n\r\nfunction deg2rad(deg) {\r\n    return deg/180*3.141592654;\r\n}\r\n\r\nclass ConverterRunner {\r\n    constructor (converter_params) {\r\n        this.converter =\r\n            clustering_mode == 'color' ?\r\n                vtracer__WEBPACK_IMPORTED_MODULE_0__[\"ColorImageConverter\"].new_with_string(converter_params):\r\n                vtracer__WEBPACK_IMPORTED_MODULE_0__[\"BinaryImageConverter\"].new_with_string(converter_params);\r\n        this.converter.init();\r\n        this.stopped = false;\r\n        if (clustering_mode == 'binary') {\r\n            svg.style.background = '#000';\r\n            canvas.style.display = 'none';\r\n        } else {\r\n            svg.style.background = '';\r\n            canvas.style.display = '';\r\n        }\r\n        canvas.style.opacity = '';\r\n    }\r\n\r\n    run () {\r\n        const This = this;\r\n        setTimeout(function tick () {\r\n            if (!This.stopped) {\r\n                let done = false;\r\n                const startTick = performance.now();\r\n                while (!(done = This.converter.tick()) &&\r\n                    performance.now() - startTick < 25) {\r\n                }\r\n                progress.value = This.converter.progress();\r\n                if (progress.value >= 50) {\r\n                    canvas.style.display = 'none';\r\n                    console.log(progress.value)\r\n\r\n                } else {\r\n                    canvas.style.opacity = (50 - progress.value) / 25;\r\n\r\n                }\r\n                if (progress.value >= progress.max) {\r\n                    progressregion.style.display = 'none';\r\n                    progress.style.marginBottom = '20px';\r\n                    progress.value = 0;\r\n\r\n                }\r\n                if (!done) {\r\n                    setTimeout(tick, 1);\r\n                }\r\n            }\r\n        }, 1);\r\n    }\r\n\r\n    stop () {\r\n        this.stopped = true;\r\n        this.converter.free();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);