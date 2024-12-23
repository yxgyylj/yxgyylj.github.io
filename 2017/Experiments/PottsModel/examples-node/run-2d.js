/** Run a CPM in 2D, and print centroids of all cells each 50 monte carlo steps
    after a burnin phase of 50 Monte Carlo Steps. */

var CPM = require("../src/CPM.js")
var CPMStats = require("../src/CPMStats.js")
var CPMCanvas = require("../src/CPMCanvas.js")

var nrCells = parseInt(process.argv[2]) || 1
var fieldSize = parseInt(process.argv[3]) || 1000
var framerate = parseInt(process.argv[4]) || 10

var C = new CPM( 2, {x: fieldSize, y:fieldSize}, {
	LAMBDA_CONNECTIVITY : [0,0,0],
	FRC_BOOST : [0,3,0],
	LAMBDA_P : [0,2,1],
	LAMBDA_V : [0,50,50],
	LAMBDA_ACT : [0,140,0],
	LAMBDA_DIR : [0,0,200],
	MAX_ACT : [0,40,0],
	P : [0,340,100],
	V : [0,500,100],
	J_T_STROMA : [NaN,16,16],
	J_T_ECM : [NaN,20,20],
	J_T_T : [ [NaN,NaN,NaN], [NaN,100,-40], [NaN,-40,NaN] ],
	T : 20,
	ACT_MEAN : "geometric" 
})
	
var Cstat = new CPMStats( C )
var Cim = new CPMCanvas( C )
var t = 0

for( i = 0 ; i < nrCells ; i ++ ){
	C.seedCell()
}

// burnin phase
for( i = 0 ; i < 50 ; i ++ ){
	C.monteCarloStep()
}

// actual simulation
for( i = 0 ; i < 500 ; i ++ ){
	C.monteCarloStep()
	Cstat.centroids()
	if( i % framerate == 0 ){
		Cim.clear( "FFFFFF" )
		//Cim.drawCells( 2, "990000" )
		Cim.drawCells( 1, "CCCCCC" )
		Cim.drawCellBorders( "FFFFFF" )
		Cim.writePNG( "output/"+t+".png" )
		t ++
	}
}
