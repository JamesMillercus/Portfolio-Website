# portfolio sections
portfolio_sections = [Top_right, Top_centre, Top_left, Middle_right, Middle_left, Bottom_right, Bottom_centre, Bottom_left]

portfolio_items = [Krispy_Kreme, Beerpump, Mood_Tree, Leap_Tassimo, WIYWI, Hacky_xmas, Maker, Epic_Mind_Drive]
# portfolio item states
Krispy_Kreme.states.active =
	image: "images/krispyKreme-colour.png"
Krispy_Kreme.states.nonactive =
	image: "images/krispyKreme-bw.png"
Beerpump.states.active =
	image: "images/beerGif-colour.png"
Beerpump.states.nonactive =
	image: "images/beerGif-bw.png"
Mood_Tree.states.active =
	image: "images/moodTree-colour.png"
Mood_Tree.states.nonactive =
	image: "images/moodTree-bw.png"
Leap_Tassimo.states.active =
	image: "images/leapTassimo-colour.png"
Leap_Tassimo.states.nonactive =
	image: "images/leapTassimo-bw.png"
WIYWI.states.active =
	image: "images/wiywiGif-colour.png"
WIYWI.states.nonactive =
	image: "images/wiywiGif-bw.png"
Hacky_xmas.states.active =
	image: "images/hackyXmasGif-colour.png"
Hacky_xmas.states.nonactive =
	image: "images/hackyXmasGif-bw.png"
Maker.states.active =
	image: "images/makerGifFinal-colour.png"
Maker.states.nonactive =
	image: "images/makerGifFinal-bw.png"
Epic_Mind_Drive.states.active =
	image: "images/MSMgif-colour.png"
Epic_Mind_Drive.states.nonactive =
	image: "images/MSMgif-bw.png"
# reset positions
centerposX = -360
centerposY = -225
# animation positions
portfolio_x_positions = [-500, centerposX, -220, -500, -220, -500, centerposX, -220]
portfolio_y_positions = [-50,-50, -210, centerposY, centerposY, -400, -400, -400]
previousChild = null

# mouse over detection
for active in [0...portfolio_sections.length]
	portfolio_sections[active].onMouseOver (event, layer) ->
			animateIn(layer)
			switchImage(layer)
	portfolio_sections[active].onMouseOut (event, layer) ->
			previousChild.states.switch("nonactive")
			animateOut(layer)

centerText = [J, a, m, e, s, M, i, l, l_1, e_1, r]

for active in [0...centerText.length]
	centerText[active].onMouseOver (event, layer) ->
		layer.animate
			options:
				time: 1
				curve: Bezier.ease

# 		for child in layer.subLayers
# 				for current in [0...portfolio_items.length]
# 					if child.name == portfolio_items[current].name
# # 						if child.children[0].name == "Text"
# # 							animateText(child.children[0])
# 						child.states.switch("active")
# 						previousChild = child

# Switch image on scroll over
switchImage = (layer) ->
	for child in layer.subLayers
				for current in [0...portfolio_items.length]
					if child.name == portfolio_items[current].name
# 						if child.children[0].name == "Text"
# 							animateText(child.children[0])
						child.states.switch("active")
						previousChild = child


		J.animate
			options:
				time: 1
				curve: Bezier.easeInOut

# animation in
animateIn = (layer) ->
	for active in [0...portfolio_sections.length]
		if portfolio_sections[active] == layer
			site_background.animate
				x: portfolio_x_positions[active]
				y: portfolio_y_positions[active]
				options:
					time: 0.6
					curve: Bezier.easeInOut

# animation out
animateOut = (layer) ->
	for active in [0...portfolio_sections.length]
		site_background.animate
			x: centerposX
			y: centerposY
			options:
				time: 5
				curve: Spring
				delay: 0.00

Framer.Device.fullScreen = true
# Fold above code into scrolling functionality
# Create panning functionality
# Center text animation
# Asset change on text animation (and watching all items)
