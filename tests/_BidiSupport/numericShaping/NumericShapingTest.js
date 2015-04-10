define(["doh/runner", "dojo/has"], function(doh, has){

	has.add("dojo-bidi", true);
	
	var widgets = [{"widPath":"dijit/form/TextBox","widAttr":["title", "placeHolder", "displayedValue", "value"]},
	               {"widPath":"dijit/layout/ContentPane","widAttr":["title", "loadingMessage", "errorMessage", "content"]},
	               {"widPath":"dijit/form/CurrencyTextBox","widAttr":["title","invalidMessage","missingMessage","promptMessage","placeHolder"]},
	               {"widPath":"dijit/form/DateTextBox","widAttr":["title","invalidMessage","missingMessage","promptMessage","placeHolder"]},
	               {"widPath":"dijit/form/NumberSpinner","widAttr":["title","invalidMessage","missingMessage","promptMessage","placeHolder"]},
	               {"widPath":"dijit/form/NumberTextBox","widAttr":["title","invalidMessage","missingMessage","promptMessage","placeHolder"]},
	               {"widPath":"dijit/form/TimeTextBox","widAttr":["title","invalidMessage","missingMessage","promptMessage","placeHolder"]},
	               {"widPath":"dijit/form/ValidationTextBox","widAttr":["title","invalidMessage","missingMessage","promptMessage","placeHolder", "displayedValue", "value"]},
	               {"widPath":"dijit/form/Textarea","widAttr":["title", "displayedValue", "value"]},
	               {"widPath":"dijit/form/SimpleTextarea","widAttr":["title", "displayedValue", "value", "placeHolder"]},
	               {"widPath":"dijit/form/HorizontalSlider","widAttr":["title"]},
	               {"widPath":"dijit/form/VerticalSlider","widAttr":["title"]},
	               {"widPath":"dijit/form/Button","widAttr":["title", "label"]},
	               {"widPath":"dijit/form/ComboButton","widAttr":["title", "label"]},
	               {"widPath":"dijit/form/DropDownButton","widAttr":["title", "label"]},
	               {"widPath":"dijit/form/ToggleButton","widAttr":["title", "label"]},
	               {"widPath":"dijit/DropDownMenu","widAttr":["title", "label"]},
	               {"widPath":"dijit/ConfirmDialog","widAttr":["title","content","errorMessage","loadingMessage"]},
	               {"widPath":"dijit/Fieldset","widAttr":["title", "content","errorMessage","loadingMessage"]},
	               {"widPath":"dijit/ProgressBar","widAttr":["title", "label"]},
	               {"widPath":"dijit/TitlePane","widAttr":["title", "content","errorMessage","loadingMessage"]},
	               {"widPath":"dijit/ConfirmTooltipDialog","widAttr":["title","content","errorMessage","loadingMessage"]},
	               {"widPath":"dijit/Toolbar","widAttr":["title"]},
	               {"widPath":"dijit/Tooltip","widAttr":["title","label"]},
	               {"widPath":"dijit/ToolTipDialog","widAttr":["title","content","errorMessage","loadingMessage"]},
	               {"widPath":"dijit/MenuItem","widAttr":["title","label"]},
	               {"widPath":"dijit/PopupMenuItem","widAttr":["title","label"]},
	               {"widPath":"dijit/PopupMenuBarItem","widAttr":["title","label"]},
	               {"widPath":"dijit/MenuBarItem","widAttr":["title","label"]},
	               {"widPath":"dijit/layout/ContentPane","widAttr":["title","content","errorMessage","loadingMessage"]},
	               {"widPath":"dijit/layout/LinkPane","widAttr":["title","content","errorMessage","loadingMessage"]},
	               {"widPath":"dijit/layout/AccordionContainer","widAttr":["title","content","errorMessage","loadingMessage"]},
	               ];

	var testCases = [{"shape":"Nominal", "textDir":"ltr", "value":"abc 123", "expected":"abc 123"},
					 {"shape":"Nominal", "textDir":"ltr", "value":"اول 123", "expected":"اول 123"},
					 {"shape":"Nominal", "textDir":"rtl", "value":"اول 123", "expected":"اول 123"},
					 {"shape":"Nominal", "textDir":"ltr", "value":"اول 123 abc 123", "expected":"اول 123 abc 123"},
					 {"shape":"Nominal", "textDir":"ltr", "value":"123", "expected":"123"},
					 {"shape":"Nominal", "textDir":"rtl", "value":"123", "expected":"123"},
					 
					 {"shape":"National", "textDir":"ltr", "value":"abc 123", "expected":"abc ١٢٣"},
					 {"shape":"National", "textDir":"ltr", "value":"اول 123", "expected":"اول ١٢٣"},
					 {"shape":"National", "textDir":"rtl", "value":"اول 123", "expected":"اول ١٢٣"},
					 {"shape":"National", "textDir":"ltr", "value":"اول 123 abc 123", "expected":"اول ١٢٣ abc ١٢٣"},
					 {"shape":"National", "textDir":"ltr", "value":"123", "expected":"١٢٣" },
					 {"shape":"National", "textDir":"rtl", "value":"123", "expected":"١٢٣" },
					 
					 {"shape":"Contextual", "textDir":"", "value":"abc 123", "expected": "abc 123"},
					 {"shape":"Contextual", "textDir":"", "value":"اول 123", "expected": "اول ١٢٣"},
					 {"shape":"Contextual", "textDir":"", "value":"اول 123 abc 123", "expected": "اول ١٢٣ abc 123"},
					 {"shape":"Contextual", "textDir":"", "value":"123", "expected": "123"},
					 
					 {"shape":"Contextual", "textDir":"ltr", "value":"abc 123", "expected": "abc 123"},
					 {"shape":"Contextual", "textDir":"ltr", "value":"اول 123", "expected": "اول ١٢٣"},
					 {"shape":"Contextual", "textDir":"ltr", "value":"اول 123 abc 123", "expected": "اول ١٢٣ abc 123"},
					 {"shape":"Contextual", "textDir":"ltr", "value":"123", "expected": "123"},
					 
					 {"shape":"Contextual", "textDir":"rtl", "value":"abc 123", "expected":"abc 123" },
					 {"shape":"Contextual", "textDir":"rtl", "value":"اول 123", "expected": "اول ١٢٣"},
					 {"shape":"Contextual", "textDir":"rtl", "value":"اول 123 abc 123", "expected": "اول ١٢٣ abc 123"},
					 {"shape":"Contextual", "textDir":"rtl", "value":"123", "expected":"١٢٣"},
					 
					 // Arabic Inputs
					 
					 {"shape":"Nominal", "textDir":"ltr", "value":"abc ١٢٣", "expected":"abc 123"},
					 {"shape":"Nominal", "textDir":"ltr", "value":"اول ١٢٣", "expected":"اول 123"},
					 {"shape":"Nominal", "textDir":"rtl", "value":"اول ١٢٣", "expected":"اول 123"},
					 {"shape":"Nominal", "textDir":"ltr", "value":"اول ١٢٣ abc ١٢٣", "expected":"اول 123 abc 123"},
					 {"shape":"Nominal", "textDir":"ltr", "value":"١٢٣", "expected":"123"},
					 {"shape":"Nominal", "textDir":"rtl", "value":"١٢٣", "expected":"123"},
					 
					 {"shape":"National", "textDir":"ltr", "value":"abc ١٢٣", "expected":"abc ١٢٣"},
					 {"shape":"National", "textDir":"ltr", "value":"اول ١٢٣", "expected":"اول ١٢٣"},
					 {"shape":"National", "textDir":"rtl", "value":"اول ١٢٣", "expected":"اول ١٢٣"},
					 {"shape":"National", "textDir":"ltr", "value":"اول ١٢٣ abc ١٢٣", "expected":"اول ١٢٣ abc ١٢٣"},
					 {"shape":"National", "textDir":"ltr", "value":"١٢٣", "expected":"١٢٣" },
					 {"shape":"National", "textDir":"rtl", "value":"١٢٣", "expected":"١٢٣" },
					 
					 {"shape":"Contextual", "textDir":"", "value":"abc ١٢٣", "expected": "abc 123"},
					 {"shape":"Contextual", "textDir":"", "value":"اول ١٢٣", "expected": "اول ١٢٣"},
					 {"shape":"Contextual", "textDir":"", "value":"اول ١٢٣ abc ١٢٣", "expected": "اول ١٢٣ abc 123"},
					 {"shape":"Contextual", "textDir":"", "value":"١٢٣", "expected": "123"},
					 
					 {"shape":"Contextual", "textDir":"ltr", "value":"abc ١٢٣", "expected": "abc 123"},
					 {"shape":"Contextual", "textDir":"ltr", "value":"اول ١٢٣", "expected": "اول ١٢٣"},
					 {"shape":"Contextual", "textDir":"ltr", "value":"اول ١٢٣ abc ١٢٣", "expected": "اول ١٢٣ abc 123"},
					 {"shape":"Contextual", "textDir":"ltr", "value":"١٢٣", "expected": "123"},
					 
					 {"shape":"Contextual", "textDir":"rtl", "value":"abc ١٢٣", "expected":"abc 123" },
					 {"shape":"Contextual", "textDir":"rtl", "value":"اول ١٢٣", "expected": "اول ١٢٣"},
					 {"shape":"Contextual", "textDir":"rtl", "value":"اول ١٢٣ abc ١٢٣", "expected": "اول ١٢٣ abc 123"},
					 {"shape":"Contextual", "textDir":"rtl", "value":"١٢٣", "expected":"١٢٣"},
					
					];
	var numeralTestCases = [{"shape":"Nominal", "textDir":"ltr", "value":"12", "expected":"12"},
	                        {"shape":"Nominal", "textDir":"rtl", "value":"12", "expected":"12"},
	                        {"shape":"National", "textDir":"ltr", "value":"12", "expected":"١٢"},
	                        {"shape":"National", "textDir":"rtl", "value":"12", "expected":"١٢"},
	                        {"shape":"Contextual", "textDir":"ltr", "value":"12", "expected":"12"},
	                        {"shape":"Contextual", "textDir":"rtl", "value":"12", "expected":"١٢"},
					 ];
	
	var dateTestCases = [{"shape":"Nominal", "textDir":"ltr", "value":"4/8/2015", "expected":"4/8/2015"},
	                        {"shape":"Nominal", "textDir":"rtl", "value":"4/8/2015", "expected":"4/8/2015"},
	                        {"shape":"National", "textDir":"ltr", "value":"4/8/2015", "expected":"٤/٨/٢٠١٥"},
	                        {"shape":"National", "textDir":"rtl", "value":"4/8/2015", "expected":"٤/٨/٢٠١٥"},
	                        {"shape":"Contextual", "textDir":"ltr", "value":"4/8/2015", "expected":"4/8/2015"},
	                        {"shape":"Contextual", "textDir":"rtl", "value":"4/8/2015", "expected":"٤/٨/٢٠١٥"},
					 ];
	
	var timeTestCases = [{"shape":"Nominal", "textDir":"ltr", "value":"T12:15", "expected":"12:15"},
	                        {"shape":"Nominal", "textDir":"rtl", "value":"T12:15", "expected":"12:15"},
	                        {"shape":"National", "textDir":"ltr", "value":"T12:15", "expected":"١٢:١٥"},
	                        {"shape":"National", "textDir":"rtl", "value":"T12:15", "expected":"١٢:١٥"},
	                        {"shape":"Contextual", "textDir":"ltr", "value":"T12:15", "expected":"12:15"},
	                        {"shape":"Contextual", "textDir":"rtl", "value":"T12:15", "expected":"١٢:١٥"},
					 ];

	doh.register("dijit.tests._BidiSupport.numericShaping.NumericShapingTest", [
	     {
	    	 name: "Numeric Shaping setter & getter Test" ,
		       runTest:function(){
		    	   var bidiWidget = new dijit._Widget({numericShaperType: ""});
		    	   doh.assertEqual("Nominal", bidiWidget.getNumericShaperType());
		    	   bidiWidget.set("numericShaperType", "National");
		    	   doh.assertEqual("National", bidiWidget.getNumericShaperType());
		    	   bidiWidget.set("numericShaperType", "Nominal");
		    	   doh.assertEqual("Nominal", bidiWidget.getNumericShaperType());
		    	   bidiWidget.set("numericShaperType", "Contextual");
		    	   doh.assertEqual("Contextual", bidiWidget.getNumericShaperType());
		    	   bidiWidget.set("numericShaperType", "blahblah");
		    	   doh.assertEqual("Nominal", bidiWidget.getNumericShaperType());
		    	   
		    	   bidiWidget.setNumericShaperType("Nominal");
		    	   doh.assertEqual("Nominal", bidiWidget.getNumericShaperType());
		    	   bidiWidget.setNumericShaperType("National");
		    	   doh.assertEqual("National", bidiWidget.getNumericShaperType());
		    	   bidiWidget.setNumericShaperType("Contextual");
		    	   doh.assertEqual("Contextual", bidiWidget.getNumericShaperType());
		    	   bidiWidget.setNumericShaperType("blah");
		    	   doh.assertEqual("Nominal", bidiWidget.getNumericShaperType());
		    	   
		    	   
		       }
	     },
	     {
	    	 name: "Numeric Shaping dijit/form/Select" ,
		       runTest:function(){
		    	   require(["dijit/form/Select"], function(Select){
		    		   var bidiWidget = new Select();
		    		   bidiWidget.addOption({value:"testValue", label:"testLabel"});
			    	   testCases.forEach(function(testCase){
			    		   bidiWidget.set("numericShaperType", testCase.shape);
			    		   bidiWidget.set("textDir", testCase.textDir);
			    		   bidiWidget.set("title", testCase.value);
			    		   bidiWidget.set("emptyLabel", testCase.value);
			    		   bidiWidget.updateOption({value:"testValue", label:testCase.value});
		    			   doh.assertEqual(testCase.shape, bidiWidget.get("numericShaperType"));
		    			   doh.assertEqual(testCase.textDir, bidiWidget.get("textDir"));
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("title"), "title "+ testCase.shape + "-" + testCase.textDir);
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("emptyLabel"), "emptyLabel " + testCase.shape + "-" + testCase.textDir);
		    			   doh.assertEqual(testCase.expected, bidiWidget.getOptions("testValue").label, "testValue " + testCase.shape + "-" + testCase.textDir);
		    		   });
		    	   });
		       }
	     },
	     {
	    	 name: "Numeric Shaping dijit/form/CheckBox" ,
		       runTest:function(){
		    	   require(["dijit/form/CheckBox"], function(CheckBox){
		    		   var bidiWidget = new CheckBox({});
			    	   testCases.forEach(function(testCase){
			    		   bidiWidget.set("numericShaperType", testCase.shape);
			    		   bidiWidget.textDir = testCase.textDir;
			    		   bidiWidget.set("label", testCase.value);
			    		   bidiWidget.set("title", testCase.value);
		    			   doh.assertEqual(testCase.shape, bidiWidget.get("numericShaperType"));
		    			   doh.assertEqual(testCase.textDir, bidiWidget.get("textDir"));
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("title"), "CheckBox - title "+ testCase.shape + "-" + testCase.textDir);
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("label"), "CheckBox - label "+ testCase.shape + "-" + testCase.textDir);
		    		   });
		    	   });
		       }
	     },
	     {
	    	 name: "Numeric Shaping dijit/form/RadioButton" ,
		       runTest:function(){
		    	   require(["dijit/form/RadioButton"], function(RadioButton){
		    		   var bidiWidget = new RadioButton({});
			    	   testCases.forEach(function(testCase){
			    		   bidiWidget.set("numericShaperType", testCase.shape);
			    		   bidiWidget.textDir = testCase.textDir;
			    		   bidiWidget.set("label", testCase.value);
			    		   bidiWidget.set("title", testCase.value);
		    			   doh.assertEqual(testCase.shape, bidiWidget.get("numericShaperType"));
		    			   doh.assertEqual(testCase.textDir, bidiWidget.get("textDir"));
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("title"), "CheckBox - title "+ testCase.shape + "-" + testCase.textDir);
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("label"), "CheckBox - label "+ testCase.shape + "-" + testCase.textDir);
		    		   });
		    	   });
		       }
	     },
	     {
	    	 name: "Numeric Shaping dijit/form/CurrencyTextBox_2" ,
		       runTest:function(){
		    	   require(["dijit/form/CurrencyTextBox"], function(CurrencyTextBox){
		    		   var bidiWidget = new CurrencyTextBox({constraints:{fractional:false}});
		    		   numeralTestCases.forEach(function(testCase){
		    			   bidiWidget.set("numericShaperType", testCase.shape);
			    		   bidiWidget.set("textDir", testCase.textDir);
		    			   bidiWidget.set("value", testCase.value);
		    			   doh.assertEqual(testCase.shape, bidiWidget.get("numericShaperType"));
		    			   doh.assertEqual(testCase.textDir, bidiWidget.get("textDir"));
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("displayedValue"), "CurrencyTextBox_2 - displayedValue "+testCase.shape+","+testCase.textDir);
		    			   //doh.assertEqual(testCase.expected, bidiWidget.get("value"), "CurrencyTextBox_2 - Value " + testCase.shape + "," + testCase.textDir);
		    		   });
	    			});
		       }
	     },
	     {
	    	 name: "Numeric Shaping dijit/form/NumberSpinner_2" ,
		       runTest:function(){
		    	   require(["dijit/form/NumberSpinner"], function(NumberSpinner){
		    		   var bidiWidget = new NumberSpinner({});
		    		   numeralTestCases.forEach(function(testCase){
		    			   bidiWidget.set("numericShaperType", testCase.shape);
			    		   bidiWidget.set("textDir", testCase.textDir);
		    			   bidiWidget.set("value", testCase.value);
		    			   doh.assertEqual(testCase.shape, bidiWidget.get("numericShaperType"));
		    			   doh.assertEqual(testCase.textDir, bidiWidget.get("textDir"));
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("displayedValue"), "NumberSpinner_2 - displayedValue "+testCase.shape+","+testCase.textDir);
		    			   //doh.assertEqual(testCase.expected, bidiWidget.get("value"), "NumberSpinner_2 - Value " + testCase.shape + "," + testCase.textDir);
		    		   });
	    			});
		       }
	     },
	     {
	    	 name: "Numeric Shaping dijit/form/NumberTextBox_2" ,
		       runTest:function(){
		    	   require(["dijit/form/NumberTextBox"], function(NumberTextBox){
		    		   var bidiWidget = new NumberTextBox({});
		    		   numeralTestCases.forEach(function(testCase){
		    			   bidiWidget.set("numericShaperType", testCase.shape);
			    		   bidiWidget.set("textDir", testCase.textDir);
		    			   bidiWidget.set("value", testCase.value);
		    			   doh.assertEqual(testCase.shape, bidiWidget.get("numericShaperType"));
		    			   doh.assertEqual(testCase.textDir, bidiWidget.get("textDir"));
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("displayedValue"), "NumberTextBox_2 - displayedValue "+testCase.shape+","+testCase.textDir);
		    			   //doh.assertEqual(testCase.expected, bidiWidget.get("value"), "NumberTextBox_2 - Value " + testCase.shape + "," + testCase.textDir);
		    		   });
	    			});
		       }
	     },
	     {
	    	 name: "Numeric Shaping dijit/ProgressBar_2" ,
		       runTest:function(){
		    	   require(["dijit/ProgressBar"], function(ProgressBar){
		    		   var bidiWidget = new ProgressBar({});
		    		   numeralTestCases.forEach(function(testCase){
		    			   bidiWidget.set("numericShaperType", testCase.shape);
			    		   bidiWidget.set("textDir", testCase.textDir);
		    			   bidiWidget.set("value", testCase.value);
		    			   doh.assertEqual(testCase.shape, bidiWidget.get("numericShaperType"));
		    			   doh.assertEqual(testCase.textDir, bidiWidget.get("textDir"));
		    			   //doh.assertEqual(testCase.expected, bidiWidget.labelNode.textContent.replace("%",""), "ProgressBar_2 - labelNode " + testCase.shape + "," + testCase.textDir);
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("value"), "ProgressBar_2 - Value " + testCase.shape + "," + testCase.textDir);
		    		   });
	    			});
		       }
	     },
	     {
	    	 name: "Numeric Shaping dijit/InlineEditBox_2" ,
		       runTest:function(){
		    	   require(["dijit/InlineEditBox"], function(InlineEditBox){
		    		   var bidiWidget = new InlineEditBox({editor: "dijit/form/TextBox", autoSave: false}, document.createElement("div"));
		    		   testCases.forEach(function(testCase){
		    			   bidiWidget.set("numericShaperType", testCase.shape);
		    			   bidiWidget.set("textDir", testCase.textDir);
		    			   bidiWidget.set("title", testCase.value);
		    			   bidiWidget.set("value", testCase.value);
		    			   doh.assertEqual(testCase.shape, bidiWidget.get("numericShaperType"));
		    			   doh.assertEqual(testCase.textDir, bidiWidget.get("textDir"));
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("title"), "InlineEditBox - title " + testCase.shape + "," + testCase.textDir);
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("value"), "InlineEditBox - value " + testCase.shape + "," + testCase.textDir);
		    		   });
	    			});
		       }
	     },
	     {
	    	 name: "Numeric Shaping dijit/Tree" ,
		       runTest:function(){
		    	   require(["dojo/store/Memory", "dojo/store/Observable", "dijit/tree/ObjectStoreModel", "dijit/Tree"], function(Memory, Observable, ObjectStoreModel, Tree){
		    		   var myStore = new Memory({
		    			   data: [ { id: '_id', name:'abc 123', type:'type'}],
		    		        getChildren: function(object){
		    		            return this.query({parent: object.id});
		    		        } 
		    		   });
		    		   myStore = new Observable(myStore);
		    		   var myModel = new ObjectStoreModel({
		    		        store: myStore,
		    		        query: { id: "_id" }
		    		    });

		    		   testCases.forEach(function(testCase){
		    			   var bidiWidget = new Tree({
			    		        model: myModel,
			    		        numericShaperType: testCase.shape,
			    		        textDir: testCase.textDir
			    		    });
			    		   bidiWidget.set("title", testCase.value);
			    		   myStore.remove('_id');
			    		   myStore.add({id: '_id', name:testCase.value, type:'type'});
		    			   doh.assertEqual(testCase.shape, bidiWidget.get("numericShaperType"));
		    			   doh.assertEqual(testCase.textDir, bidiWidget.get("textDir"));
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("title"), "Tree title "+ testCase.shape + "-" + testCase.textDir);
		    			   doh.assertEqual(testCase.expected, bidiWidget.model.store.data[0].name, "Tree label " + testCase.shape + "-" + testCase.textDir);
		    		   });

	    			});
		       }
	     },
	     {
	    	 name: "Numeric Shaping dijit/form/DateTextBox" ,
		       runTest:function(){
		    	   require(["dijit/form/DateTextBox"], function(DateTextBox){
		    		   
		    		   dateTestCases.forEach(function(testCase){
		    			   var bidiWidget = new DateTextBox();
		    			   bidiWidget.set("numericShaperType", testCase.shape);
		    			   bidiWidget.set("textDir", testCase.textDir);
		    			   bidiWidget.set("value", new Date(testCase.value));
		    			   doh.assertEqual(testCase.shape, bidiWidget.get("numericShaperType"));
		    			   doh.assertEqual(testCase.textDir, bidiWidget.get("textDir"));
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("displayedValue"), "DateTextBox - displayedValue " + testCase.shape + "," + testCase.textDir);
		    			   //doh.assertEqual(testCase.expected, bidiWidget.get("value"), "DateTextBox - value " + testCase.shape + "," + testCase.textDir);
		    		   });
	    			});
		       }
	     },
	     {
	    	 name: "Numeric Shaping dijit/form/TimeTextBox" ,
		       runTest:function(){
		    	   require(["dijit/form/TimeTextBox"], function(TimeTextBox){
		    		   timeTestCases.forEach(function(testCase){
		    			   var bidiWidget = new TimeTextBox({value:testCase.value, numericShaperType: testCase.shape, textDir: testCase.textDir, constraints: {timePattern: 'HH:mm'}});
		    			   doh.assertEqual(testCase.shape, bidiWidget.get("numericShaperType"));
		    			   doh.assertEqual(testCase.textDir, bidiWidget.get("textDir"));
		    			   doh.assertEqual(testCase.expected, bidiWidget.get("displayedValue"), "TimeTextBox - displayedValue " + testCase.shape + "," + testCase.textDir);
		    			   //doh.assertEqual(testCase.expected, bidiWidget.get("value"), "TimeTextBox - value " + testCase.shape + "," + testCase.textDir);
		    		   });
	    			});
		       }
	     }         
	 ]);

	widgets.forEach(function(widgetEntry) {
		require([widgetEntry.widPath], function(_widget){
			
			doh.register("dijit.tests._BidiSupport.numericShaping.NumericShapingTest", [
			    {
			       name: "test of " + widgetEntry.widPath ,
			       runTest:function(){
			    	   var bidiWidget = new _widget({numericShaperType: "Nominal", textDir:"ltr"});
			    	   widgetEntry.widAttr.forEach(function(attr){
			    		   testCases.forEach(function(testCase){
			    			   bidiWidget.set("numericShaperType", testCase.shape);
			    			   bidiWidget.set("textDir", testCase.textDir);
			    			   bidiWidget.set(attr, testCase.value);
			    			   doh.assertEqual(testCase.shape, bidiWidget.get("numericShaperType"));
			    			   doh.assertEqual(testCase.textDir, bidiWidget.get("textDir"));
			    			   doh.assertEqual(testCase.expected, bidiWidget.get(attr), widgetEntry.widPath +"."+attr+ " - " + testCase.shape + "-" +testCase.textDir);
			    		   });
			    		   
			    	   });
			       }
			    },
			    
			    
			 ]);
			
		});// end of require
		
	}); // end of forEach
	
	
});
