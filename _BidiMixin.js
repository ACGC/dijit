define(["dojo/data/util/NumericShaperUtility","dojo/on", "dojo/query", "dojo/aspect"], function(NumericShaper, on, query, aspect){

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

		// textDir: String
		//		Bi-directional support,	the main variable which is responsible for the direction of the text.
		//		The text direction can be different than the GUI direction by using this parameter in creation
		//		of a widget.
		//
		//		Allowed values:
		//
		//		1. "ltr"
		//		2. "rtl"
		//		3. "auto" - contextual the direction of a text defined by first strong letter.
		//
		//		By default is as the page direction.
		textDir: "",
		
		// numericShaperType: String
		//		Bi-directional support,	the variable which is responsible for the shaping type of the digits.
		//		Arabic and many other languages have classical shapes for digits “National Digits” that are different from the conventional Western Digits (European).
		//		National digits have the same semantic meaning as the European digits. The difference is only a difference in glyphs.
		//
		//		Allowed values:
		//
		//		1. "Nominal"  - The digit shapes will be Arabic-European.
		//		2. "National" - The digit shapes will be Arabic-Indic.
		//		3. "Contextual" - Digit shapes are determined from adjoining characters in the value.
		//
		//		By default it is "Nominal"/Arabic-European digits.
		numericShaperType: "Nominal",
		
		getNumericShaperType: function(){
			// summary:
			//		Gets the numeric shaping type of the widget.
			
			return this.numericShaperType;
		},
		
		setNumericShaperType: function(type){
			// summary:
			//		Sets the numeric shaping type of the widget.
			
			this.numericShaperType = type;
			// should we call _checkNumericShapingAttr() here ?
			// so that calling widget.setNumericShaperType() immediately affect the widget's digits.
		},

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
//			if(element.value){
//				element.value = this.applyNumericShaping(element.value);	
//			}
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

		postMixInProperties: function(){
			this.inherited(arguments);
			
			aspect.before(this,"set", function(name, value){
				if(["label", "title", "placeHolder", "content", "value"].indexOf(name) > -1 && typeof value === 'string'){
					value = this.applyNumericShaping(value);
				}
				return arguments;
			});
			
			// select [displayed value]
			aspect.before(this,"_setDisplay", function(newDisplay){
				newDisplay = this.applyNumericShaping(newDisplay);
				return arguments;
			});
			
			// ProgressBar [value must be a valid Number]
			aspect.after(this,"report", function(newDisplay){
				return this.applyNumericShaping(newDisplay);
			});
			
			if(this.numericShaperType != "Nominal"){
				//Ruler
				if(this.labels){
					this.labels = this.getLabels();
					for(var i = 0; i < this.labels.length; i++)
						this.labels[i] =  this.applyNumericShaping(this.labels[i]);
				}
				//ComboButton
				if (this.optionsTitle){
					this.set("optionsTitle", this.applyNumericShaping(this.optionsTitle));
				}
			}
		},
		
		postCreate : function(){
			this.inherited(arguments);
			if(this.numericShaperType != "Nominal")
				this._checkNumericShapingAttr();
		},
		
		_changeHandler: function(attr, oldVal, newVal){
			
			this.set(attr, this.applyNumericShaping(newVal));
		},

		_checkNumericShapingAttr: function (){
			//Button, CheckBox, RadioButton, ComboButton
//			if (this.label){
//				this.set("label", this.applyNumericShaping(this.label));
//			}
			
			// Textbox, CurrencyTextBox, DateTextBox, NumberSpinner
			// NumberTextBox, TimeTextBox, ValidationTextBox
			// SimpleTextArea
			if (this.displayedValue){
				this.set("displayedValue", this.applyNumericShaping(this.displayedValue));
			}
			// SimpleTextArea
//			if (this.value && typeof this.value === 'string'){
//				this.set("value", this.applyNumericShaping(this.value));
//			}
			
			//Select  // no need for this code 
			/*if(this.options){ 
				var nOptions = this.options;
				for(var i = 0; i < this.options.length; i++)
					nOptions[i].label =  this.applyNumericShaping(this.options[i].label);
				this.set('options', nOptions);
			}*/

			// MultiSelect, ComboBox, FilteringSelect
			query("option", this.containerNode).forEach(function(option){
				if(option.text)
					option.text = this.applyNumericShaping(option.text);
			}, this);
			
			this.watch("displayedValue", this._changeHandler);
		},
		
		applyNumericShaping : function( /*String?*/ text, /*optional*/ shaperType) {
			// summary:
			//		Apply the shaping behavior.

			text = new String(text);
			shaperType = shaperType || this.numericShaperType;
			var ob = new NumericShaper();
			var shapedString = "";
			
			if (this.numericShaperType === "National") {
				ob.getShaper(ob.ARABIC); // National
			} else if (this.numericShaperType === "Contextual") {
				ob.getContextualShaper(ob.ARABIC, ob.EUROPEAN); // Contextual Arabic
			} else {
				ob.getShaper(ob.EUROPEAN); // Nominal
			}

			if (text) {
				shapedString = ob.shapeWith(shaperType, text).join("");
			}
			
			return shapedString;
		}
		
	};
});
