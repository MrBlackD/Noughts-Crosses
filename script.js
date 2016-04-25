var turn;
var N;
var map=[];


window.onload=function(){
	$('#start,#restart').on("mouseover",function(){
		$(this).css("text-shadow","none");
	});
	$('#start,#restart').on("mouseout",function(){
		$(this).css("text-shadow","");
	});
	$('#restart').on("click",function(){
		reset();
	});

	$('#start').on("click",function(){

		$('#caption').text("Ход игрока 1");
		turn=1;
		N=parseInt(prompt("Задайте размер игрового поля(минимум 5)"));
		if(!N||N<5){
			N=5;
		}
		for(var i=0;i<N;i++){
			map[i]=[];
			for(var j=0;j<N;j++){
				map[i][j]="";
			}
		}
		$('#start').css("display","none");
		$('#caption,#restart').css("display","block");

		drawField();
		

			$("TD").each(function(index){
				$(this).on("click",function(){
					$(this).text((turn%2==1)?"X":"O");
		 			$(this).css("background",(turn%2==1)?"#f66":"#66f");
		 			$(this).off("click");
		 			$(this).off("mouseover");
		 			$(this).off("mouseout");
		 			map[Math.floor($(this).attr("id")/N)][$(this).attr("id")%N]=(turn%2==1)?"X":"O";
		 			if(winCondition(Math.floor($(this).attr("id")/N),$(this).attr("id")%N,(turn%2==1)?"X":"O"))
		 				return;

					turn++;
					$('#caption').text("Ход игрока "+(2-turn%2));
				});
				$(this).on("mouseover",function(){
					$(this).css("background",(turn%2==1)?"#f66":"#66f");
				});
				$(this).on("mouseout",function(){
					$(this).css("background","");
				});
			});

	});

}



function winCondition(i,j,x){
	var rows=[0,0,0,0];
	if(turn==N*N){
		draw();
		return true;
	}
	for(var k=0;k<N;k++){
		if((j-i+k)>=0&&(j-i+k)<N){
			if(map[k][j-i+k]==x)
				rows[0]++;
			else
				rows[0]=0;
		}
		if(rows[0]==5){
			win();
			return true;
		}


		if((j+i-k)>=0&&(j+i-k)<N){
			if(map[k][j+i-k]==x)
				rows[1]++;
			
			else
				rows[1]=0;
		}
		if(rows[1]==5){
			win();
			return true;
		}

		if(map[k][j]==x)
			rows[2]++;
		
		else
			rows[2]=0;

		if(rows[2]==5){
			win();
			return true;
		}

		if(map[i][k]==x)
			rows[3]++;
		
		else
			rows[3]=0;

		if(rows[3]==5){
			win();
			return true;
		}

	}
	return false;
}


function drawField(){
	var table="<table>";
	for(var i=0;i<N;i++){
		table+="<tr>";
		for(var j=0;j<N;j++)
			table+="<td id="+(j+N*i)+"></td>";
		table+="</tr>";
	}
	table+="</table>";
	$('body').append(table);
}

function win(){
	$("#caption").text("Игрок "+(2-turn%2)+" победил. Количество ходов - "+turn);
	$("#start").css("display","block");
	$("#restart").css("display","none");
	$("TABLE").remove();
}


function draw(){
	$("#caption").text="Ничья";
	$("#start").css("display","block");
	$("#restart").css("display","none");
	$("TABLE").remove();
}

function reset(){
	$("TABLE").remove();
	$("#start").css("display","block");
	$("#restart,#caption").css("display","none");
}