PhotoshopVectorExport
=====================

Description:
Exports vectors for vectrex from photoshop

How to Install:
Place in photoshop application folder /Presets/Scripts/

Script should appear under File/Scripts in the photoshop menus

What is does:
Exports paths to vectors to a txt file
Vectors are output as Y,X as required by the vectrex
Vectors are converted to vectrex space eg -127 to 127
Vectors are calculated from the previous position as required by the vectrex to draw like a pen
Closed shapes in photoshop don't add a final vector to close the shape, so this code adds one if the shape is closed.
A vector list is output per layer (only put 1 shape in each layer) and the name of the layer is used for the name of the vector list

Note: Currently you must make sure your layers in photoshop have no spaces

To do:
1. Add way to draw vectors relative to each other.
2. Add animation option maybe using naming of shapes, eg Shape_F01 Shape_F02 etc.

