define(["doh/runner", "dojo/has"], function(doh, has){

	has.add("dojo-bidi", true);
	
	var widgets = [{"widPath":"dijit/form/TextBox","widAttr":["title", "placeHolder"]},
	               {"widPath":"dijit/layout/ContentPane","widAttr":["title", "loadingMessage", "errorMessage", "content"]},
	               {"widPath":"dijit/form/CurrencyTextBox","widAttr":["title","invalidMessage","missingMessage","promptMessage","placeHolder"]},
	               {"widPath":"dijit/form/DateTextBox","widAttr":["title","invalidMessage","missingMessage","promptMessage","placeHolder"]},
	               {"widPath":"dijit/form/NumberSpinner","widAttr":["title","invalidMessage","missingMessage","promptMessage","placeHolder"]},
	               {"widPath":"dijit/form/NumberTextBox","widAttr":["title","invalidMessage","missingMessage","promptMessage","placeHolder"]},
	               {"widPath":"dijit/form/TimeTextBox","widAttr":["title","invalidMessage","missingMessage","promptMessage","placeHolder"]},
	               {"widPath":"dijit/form/ValidationTextBox","widAttr":["title","invalidMessage","missingMessage","promptMessage","placeHolder"]},
	               {"widPath":"dijit/form/Textarea","widAttr":["title"]},
	               {"widPath":"dijit/form/SimpleTextarea","widAttr":["title", "placeHolder"]},
	               {"widPath":"dijit/form/HorizontalSlider","widAttr":["title"]},
	               {"widPath":"dijit/form/VerticalSlider","widAttr":["title"]},
	               {"widPath":"dijit/form/Button","widAttr":["title", "label"]},
	               {"widPath":"dijit/form/ComboButton","widAttr":["title", "label"]},
	               {"widPath":"dijit/form/DropDownButton","widAttr":["title", "label"]},
	               {"widPath":"dijit/form/ToggleButton","widAttr":["title", "label"]},
	               {"widPath":"dijit/form/Select","widAttr":["title", "emptyLabel"]},
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
