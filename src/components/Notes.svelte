<script>
	// @ts-check
</script>

<svelte:head>
	<title>Notes</title>
</svelte:head>

<h1>SVG: Scalable Vector Graphics Note's</h1>
<dl>
	<dt>Scalable Vector Graphics (SVG)</dt>
	<dd>are an XML-based markup language for describing two-dimensional based vector graphics.</dd>
</dl>

<!--

  SVG Basic properties

-->
<ul>
	<h2>Basic properties of SVG files</h2>
	<li>
		The first important thing to notice is the order of rendering elements. The globally valid rule
		for SVG files is, that later elements are rendered atop previous elements. The further down an
		element is the more it will be visible.
	</li>

	<li>
		SVG files on the web can be displayed directly in the browser or embedded in HTML files via
		several methods:
	</li>

	<ul>
		<li>
			If the HTML is XHTML and is delivered as type application/xhtml+xml, the SVG can be directly
			embedded in the XML source.
		</li>

		<li>The SVG can also be directly embedded in HTML.</li>

		<li>An img element can be used.</li>

		<li>
			The SVG file can be referenced with an object element:
			<code> &lt;object data="image.svg" type="image/svg+xml" /&gt; </code>
		</li>

		<li>
			Likewise an iframe element can be used:
			<code> &lt;iframe src="image.svg" /&gt; </code>
		</li>

		<li>Finally, SVG can be created dynamically with JavaScript and injected into the HTML DOM.</li>
	</ul>
</ul>

<h2>Positions</h2>
<h3>The grid</h3>
<p>
	For all elements, SVG uses a coordinate system or grid system similar to the one used by canvas
	(and by a whole lot of other computer drawing routines). That is, the <b>top left corner</b> of
	the document is considered to be the point <b>(0,0)</b>, or <b>point of origin</b>. Positions are
	then measured in pixels from the top left corner, with the positive x direction being to the
	right, and the positive y direction being to the bottom.
</p>

<details>
	<summary
		>Note that this is slightly different than the way you're taught to graph as a kid</summary
	> (y axis is flipped). However, this is the same way elements in HTML are positioned (By default, LTR
	documents are considered not the RTL documents which position X from right-to-left).
</details>

<h3>What are "pixels"?</h3>
<p>
	In the most basic case one pixel in an SVG document maps to one pixel on the output device (a.k.a.
	the screen). But SVG wouldn't have the "Scalable" in its name, if there weren't several
	possibilities to change this behavior. Much like absolute and relative font sizes in CSS, SVG
	<b>defines absolute units</b> (ones with a dimensional identifier like "pt" or "cm") and so-called
	<b>user units, that lack that identifier and are plain numbers</b>.
	<i>Without further specification, one user unit equals one screen unit</i>. To explicitly change
	this behavior, there are several possibilities in SVG.
</p>
<details>
	<summary> Code Example:</summary>

	<code>&lt;svg width="200" height="200" viewBox="0 0 100 100"&gt;…&lt;/svg&gt; </code>
	<p>
		The whole SVG canvas here is 200px by 200px in size. However, the <b>viewBox</b> attribute
		defines the portion of that canvas to display. These 200x200 pixels display an area that starts
		at user unit (0,0) and spans 100x100 user units to the right and to the bottom. This
		<b>effectively zooms</b>
		in on the 100x100 unit area and <b>enlarges the image to double size</b>.
	</p>
</details>
<p>
	The current mapping (for a single element or the whole image) of user units to screen units is
	called user coordinate system. Apart from scaling the coordinate system can also be rotated,
	skewed and flipped. The default user coordinate system maps one user pixel to one device pixel.
	(However, the device may decide, what it understands as one pixel.) Lengths in the SVG file with
	specific dimensions, like "in" or "cm", are then calculated in a way that makes them appear <b
		>1:1</b
	> in the resulting image.
</p>

<h2>Basic Shapes</h2>
<dl>
	<dt>Rectangle</dt>
	<dd>
		The <b>&lt; rect &gt;</b> element draws a rectangle on the screen. There are 6 basic attributes
		that control the position and shape of the rectangles on screen.
		<details>
			<summary>Code Example</summary>
			<code>
				&lt;rect x="10" y="10" width="30" height="30"/&gt;
				<br />
				&lt;rect x="60" y="10" rx="10" ry="10" width="30" height="30"/&gt;
			</code>
			<br />
			The second one has its rx and ry parameters set, giving it rounded corners. If they're not set,
			they default to 0.
		</details>
	</dd>
</dl>

<dt>Circle</dt>
<dd>
	The <b>&lt; circle &gt;</b> element draws a circle on the screen. It takes 3 basic parameters to
	determine the shape and size of the element
	<details>
		<summary>Code Example</summary>
		<code> &lt;circle cx="25" cy="75" r="20"/&gt; </code>
	</details>
</dd>

<dt>Ellipse</dt>
<dd>
	An <b>&lt; ellipse &gt;</b> An is a more general form of the &lt;circle&gt; element, where you can
	scale the x and y radius (commonly referred to as the semimajor and semiminor axes in maths) of
	the circle separately.
	<details>
		<summary>Code Example</summary>
		<code> &lt;ellipse cx="75" cy="75" rx="20" ry="5"/&gt; </code>
	</details>
</dd>

<dt>Line</dt>
<dd>
	The <b>&lt; line &gt;</b> element takes the positions of two points as parameters and draws a
	straight line between them.
	<details>
		<summary>Code Example</summary>
		<code> &lt;line x1="10" x2="50" y1="110" y2="150" stroke="black" stroke-width="5/&gt; </code>
	</details>
</dd>

<dt>Polyline</dt>
<dd>
	A <b>&lt; polyline &gt;</b> is a group of connected straight lines. Since the list of points can
	get quite long, all the points are included in one attribute
	<details>
		<summary>Code Example</summary>
		<code>
			&lt;polyline points="60, 110 65, 120 70, 115 75, 130 80, 125 85, 140 90, 135 95, 150 100,
			145"/&gt;
		</code>
	</details>
</dd>

<dt>Polygon</dt>
<dd>
	A <b>&lt; polygon &gt;</b> is similar to a &lt; polygon &gt;, in that it is composed of straight
	line segments connecting a list of points. For polygons though, the path automatically connects
	the last point with the first, creating a closed shape.
	<details>
		<summary>points</summary>
		A list of points, each number separated by a space, comma, EOL, or a line feed character. Each point
		must contain two numbers: an x coordinate and a y coordinate. So, the list (0,0), (1,1), and (2,2)
		would be written as 0, 0 1, 1 2, 2. The drawing then closes the path, so a final straight line would
		be drawn from (2,2) to (0,0).
	</details>

	<details>
		<summary>Code Example</summary>
		<code>
			&lt;polygon points="50, 160 55, 180 70, 180 60, 190 65, 205 50, 195 35, 205 40, 190 30, 180
			45, 180"/&gt;
		</code>
	</details>
</dd>

<dt>Path</dt>
<dd>
	A <b>&lt; path &gt;</b> is the most general shape that can be used in SVG. Using a path element,
	you can draw rectangles (with or without rounded corners), circles, ellipses, polylines, and
	polygons. Basically any of the other types of shapes, bezier curves, quadratic curves, and many
	more.

	<details>
		<summary>Code Example</summary>
		<code>
			&lt;path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"/&gt;
		</code>
	</details>

	<details>
		<summary>Path Deep Dive</summary>
		The shape of a &lt; path &gt; element is defined by one parameter: <b>d</b>. The <b>d</b>
		attribute contains a series of commands and parameters used by those commands.
		<br />
		All of the commands also come in two variants. An
		<b><u>uppercase letter specifies absolute coordinates</u></b>
		on the page, and a <b><u>lowercase letter specifies relative coordinates</u></b>.
		<br />
		d is a presentation attribute, and hence can also be used as a CSS property.

		<h4>Path commands</h4>
		Path commands are instructions that define a path to be drawn. Each command is composed of a command
		letter and numbers that represent the command parameters.
		<ul>
			SVG defines 6 types of path commands, for a total of 20 commands:
			<li><b>MoveTo:</b> M, m</li>
			<li><b>LineTo:</b> L, l, H, h, V, v</li>
			<li><b>Cubic Bézier Curve:</b> C, c, S, s</li>
			<li><b>Quadratic Bézier Curve:</b> Q, q, T, t</li>
			<li><b>Elliptical Arc Curve:</b> A, a</li>
			<li><b>ClosePath:</b> Z, z</li>
		</ul>
		<br />
		<ul>
			It is always possible to specify a negative value as an argument to a command:
			<li>negative angles will be anti-clockwise;</li>
			<li>absolute negative x and y values are interpreted as negative coordinates;</li>
			<li>
				relative negative x values move to the left, and relative negative y values move upwards.
			</li>
		</ul>
	</details>
</dd>

<!--

  Terminology

-->
<hr />
<h2>Terminology</h2>
<dl>
	<dt>Scalable Vector Graphics (SVG)</dt>
	-
	<dd>are an XML-based markup language for describing two-dimensional based vector graphics.</dd>

	<dt>viewBox</dt>
	-
	<dd>attribute defines the portion of that canvas to display.</dd>
</dl>

<style>
	h1 {
		color: hsl(275, 40%, 25%);
	}
	hr {
		margin-top: 5rem;
	}
</style>
