// Adapted from this example script:
// writes a path file in text format
// Written by: Zachary McMaster
// Free Use, do what you will  :)
// Filename: SavePath.jsx

//PhotoshopVectorExport.jsx
//Modified to export vectrex vectors to a txt in Motorola style fcb statements
//each vector should go on a separate layer as the layer name is used. 
// Author Mikiex


#target photoshop

function isInt(n) {
   return n % 1 === 0;
}

var i=0;
var j=0;
var k=0;
var pathItem;
var subPathItem;
var PathPoint;
var xyoffset=128
var AddEndCoords = true  //set this to false if you don't want to loop back to the first coordinate 
var Vmode = true //take away 128 so we work in twos complement vectrex screen space (-127 to 127)
var ReverseXY = true //vectrex X and Y are reversed, so we need to reverse coords
var prevx = 0
var prevy = 0

var MyFile = File.openDialog ("Save Path File", "PathFiles:*.txt;All Files:*.*", false)
MyFile.open ("w", "?", "?");

app.preferences.rulerUnits = Units.PIXELS;

//--Write the Comment:-------------------------------------------------------------------
//MyFile.writeln("; Filename="+MyFile.name);
//MyFile.write("\n");

//--Write the Headder:---------------------------------------------------------------------
//MyFile.writeln(";GeneratedFrom="+app.activeDocument.name);
//MyFile.write("\n");

//--Write the Paths:-------------------------------------------------------------------------

var layers = app.activeDocument.layers; //important to loop every layer as pathitems are per layer even though it looks like they are per document!
for (x=0; x<layers.length; x++) 
{
    activeDocument.activeLayer=layers[x]
    
    for(i=0;i<app.activeDocument.pathItems.length;i++)
    {	
        pathItem = app.activeDocument.pathItems[i];
 //       MyFile.writeln(";[Path"+j+":"+pathItem.name+"]");
 //       MyFile.writeln(";Points="+pathItem.subPathItems[0].pathPoints.length); //first subpath only
		if (AddEndCoords == true)
			{
			end = 1
			}
		else
			{
			end = 0
			}
		MyFile.write("\n");
		MyFile.writeln(layers[x].name+"		;"+"Vector Count = "+(pathItem.subPathItems[0].pathPoints.length+end))

        for(j=0;j<pathItem.subPathItems.length;j++)
        {
            subPathItem = pathItem.subPathItems[j];
            for(k=0;k<subPathItem.pathPoints.length;k++)
            {
                PathPoint = subPathItem.pathPoints[k];
                px = PathPoint.anchor[0]-xyoffset
                py = PathPoint.anchor[1] -xyoffset
                copypx = px
                copypy = py
				if (isInt(px)==false)
					{
						alert(px+" is not an integer! use grid or pixel snap")
					}
					
					if (isInt(py)==false)
					{
						alert(py+" is not an integer! use grid or pixel snap")
					}
				
					if ((px >= 128 ) || (px <= -128)) // or
					{
						alert(px+" is out of 127 range")
					}
					
					if ((py >= 128 ) || (py <= -128)) // or
					{
						alert(py+" is out of 127 range")
					}
				
                if (Vmode == true)
                {
					px = px - prevx
					py = py - prevy
                }
                prevx=copypx//important to copy pre modified coords to previous
                prevy=copypy
				if (ReverseXY == true) 
					{
						MyFile.writeln("	fcb	"+py+","+px);
					}
					else
					{
						MyFile.writeln("	fcb	"+px+","+py);
					}
            }
        if (AddEndCoords ==true) //probably should add the coords to a new array and add the end coords instead of this needless duplication
        {
               PathPoint = subPathItem.pathPoints[0]
                px = PathPoint.anchor[0]-xyoffset
                py = PathPoint.anchor[1] -xyoffset
                if (Vmode == true)
                {
                 px = px - prevx
                 py = py - prevy
                }
               				if (ReverseXY == true) 
					{
						MyFile.writeln("	fcb	"+py+","+px);
					}
					else
					{
						MyFile.writeln("	fcb	"+px+","+py);
					}
         }
		 prevx=0	//reset these - should move its scope to not be global instead
		 prevy=0	//reset these - should move its scope to not be global instead
       }
        MyFile.write("\n");
    }
}
//-----------------------------------------------------------------------------------------------
MyFile.close();



