define(["dojo/data/util/NumericShaperUtility", "dojo/aspect"], function(NumericShaper, aspect){

	// module:
	//		dijit/_BidiMixin

	// UCC - constants that will be used by bidi support.
	var bidi_const = {
		LRM : '\u200E',
		LRE : '\u202A',
		PDF : '\u202C',
		RLM : '\u200f',
		RLE : '\u202B'
	};

	return {
		// summary:
		//		When has("dojo-bidi") is true, _WidgetBase will mixin this class.   It enables support for the textdir
		//		property to control text direction independently from the GUI direction.
		// description:
		//		There's a special need for displaying BIDI text in rtl direction
		//		in ltr GUI, sometimes needed auto support.
		//		In creation of widget, if it's want to activate this class,
		//		the widget should define the "textDir".
		
		// numericShaperType: String
		//		Bi-directional support,	the variable which is responsible for the shaping type of the digits.
		//
		//		Allowed values:
		//
		//		1. "Nominal"  - The digit shapes will be European.
		//		2. "National" - The digit shapes will be Arabic-Indic.
		//		3. "Contextual" - Digit shapes are determined from adjoining characters in the value.
		//
		//		By default it is "Nominal"/European digits.
		numericShaperType: "Nominal",

		getTextDir: function(/*String*/ text){
			// summary:
			//		Gets the right direction of text.
			// description:
			//		If textDir is ltr or rtl returns the value.
			//		If it's auto, calls to another function that responsible
			//		for checking the value, and defining the direction.
			// tags:
			//		protected.
			return this.textDir == "auto" ? this._checkContextual(text) : this.textDir;
		},

		_checkContextual: function(text){
			// summary:
			//		Finds the first strong (directional) character, return ltr if isLatin
			//		or rtl if isBidiChar.
			// tags:
			//		private.

			// look for strong (directional) characters
			var fdc = /[A-Za-z\u05d0-\u065f\u066a-\u06ef\u06fa-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/.exec(text);
			// if found return the direction that defined by the character, else return widgets dir as defult.
			return fdc ? ( fdc[0] <= 'z' ? "ltr" : "rtl" ) : this.dir ? this.dir : this.isLeftToRight() ? "ltr" : "rtl";
		},

		applyTextDir: function(/*DOMNode*/ element, /*String?*/ text){
			// summary:
			//		Set element.dir according to this.textDir, assuming this.textDir has a value.
			// element:
			//		The text element to be set. Should have dir property.
			// text:
			//		If specified, and this.textDir is "auto", for calculating the right transformation
			//		Otherwise text read from element.
			// description:
			//		If textDir is ltr or rtl returns the value.
			//		If it's auto, calls to another function that responsible
			//		for checking the value, and defining the direction.
			// tags:
			//		protected.

			if(this.textDir){
				var textDir = this.textDir;
				if(textDir == "auto"){
					// convert "auto" to either "ltr" or "rtl"
					if(typeof text === "undefined"){
						// text not specified, get text from element
						var tagName = element.tagName.toLowerCase();
						text = (tagName == "input" || tagName == "textarea") ? element.value :
							element.innerText || element.textContent || "";
					}
					textDir = this._checkContextual(text);
				}

				if(element.dir != textDir){
					// set element's dir to match textDir, but not when textDir is null and not when it already matches
					element.dir = textDir;
				}
			}
		},

		enforceTextDirWithUcc: function(option, text){
			// summary:
			//		Wraps by UCC (Unicode control characters) option's text according to this.textDir
			// option:
			//		The element (`<option>`) we wrapping the text for.
			// text:
			//		The text to be wrapped.
			// description:
			//		There's a dir problem with some HTML elements. For some elements (e.g. `<option>`, `<select>`)
			//		defining the dir in different direction then the GUI orientation, won't display correctly.
			//		FF 3.6 will change the alignment of the text in option - this doesn't follow the bidi standards (static text
			//		should be aligned following GUI direction). IE8 and Opera11.10 completely ignore dir setting for `<option>`.
			//		Therefore the only solution is to use UCC (Unicode  control characters) to display the text in correct orientation.
			//		This function saves the original text value for later restoration if needed, for example if the textDir will change etc.
			if(this.textDir){
				if(option){
					option.originalText = text;
				}
				var dir = this.textDir == "auto" ? this._checkContextual(text) : this.textDir;
				return (dir == "ltr" ? bidi_const.LRE : bidi_const.RLE ) + text + bidi_const.PDF;
			}
			return text;
		},

		restoreOriginalText: function(origObj){
			// summary:
			//		Restores the text of origObj, if needed, after enforceTextDirWithUcc, e.g. set("textDir", textDir).
			// origObj:
			//		The element (`<option>`) to restore.
			// description:
			//		Sets the text of origObj to origObj.originalText, which is the original text, without the UCCs.
			//		The function than removes the originalText from origObj!
			if(origObj.originalText){
				origObj.text = origObj.originalText;
				delete origObj.originalText;
			}
			return origObj;
		},

		_setTextDirAttr: function(/*String*/ textDir){
			// summary:
			//		Setter for textDir.
			// description:
			//		Users shouldn't call this function; they should be calling
			//		set('textDir', value)
			if(!this._created || this.textDir != textDir){
				this._set("textDir", textDir);
				var node = null;
				if(this.displayNode){
					node = this.displayNode;
					this.displayNode.align = this.dir == "rtl" ? "right" : "left";
				}else{
					node = this.textDirNode || this.focusNode || this.textbox;
				}
				if(node){
					this.applyTextDir(node);
				}
			}
		},
		
		getNumericShaperType: function(){
			// summary:
			//		Gets the numeric shaping type of the widget.
			
			return this.numericShaperType;
		},
		
		setNumericShaperType: function(type){
			// summary:
			//		Sets the numeric shaping type of the widget.
			this._setNumericShaperTypeAttr(type);
		},
		
		_setNumericShaperTypeAttr: function(type){
			// summary:
			//		Sets the numeric shaping type of the widget.
			// description:
			//		Users shouldn't call this function; they should call set('numericShaperType', value)
			if(["National", "Nominal", "Contextual"].indexOf(type) > -1)
				this.numericShaperType = type;
			else 
				this.numericShaperType = "Nominal";
		},
		
		postMixInProperties: function(){
			this.inherited(arguments);

			aspect.before(this, "set", function(name, value){
				if(this._isValidAttr(name) && typeof value === 'string'){
					value = this.applyNumericShaping(value);
				}
				return arguments;
			});
			
		},
		
		_isValidAttr: function(attrName){
			if(["label", "title", "placeHolder", "content",
			    "errorMessage", "loadingMessage", "invalidMessage",
			    "message", "missingMessage", "promptMessage",
			    "rangeMessage", "emptyLabel"].indexOf(attrName) > -1){
				return true;
			}
			return false;
		},
		
		applyNumericShaping : function( /*String?*/ text, /*optional*/ shaperType) {
			// summary:
			//		Apply the shaping algorithm on the input text according to the selected shaperType & textDir.
			// description:
			//		Arabic and many other languages have classical shapes for digits (National Digits) that are different from the conventional Western Digits (European).
			//		National digits have the same semantic meaning as the European digits. The difference is only a difference in glyphs.
			//		This function will shape the input digits as the following:
			//      1- Arabic-indic: if the shaperType was 'National'.
			//      2- Arabic-indic: if the shaperType was 'Contextual' & the preceding character was Arabic.
			//		3- Arabic-indic: if the shaperType was 'Contextual' & the textDir was 'rtl' & there is no preceding character.
			//		4- European: if the shaperType was 'Nominal'.
			//		5- European: if the shaperType was 'Contextual' & the preceding character was English.
			//		6- European: if the shaperType was 'Contextual' & the textDir was 'ltr' & there is no preceding character.

			shaperType = shaperType || this.numericShaperType;
			var shapedString = new String("");

			if (text) {
				text = new String(text);
				shapedString = NumericShaper.shape(text, shaperType, this.textDir);
			}

			return shapedString;
		}
	};
});
