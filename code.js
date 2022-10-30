function copyToClipboard(textSelector) {
	const textToCopy = document.querySelector(textSelector);
	const selection = window.getSelection();
	const range = document.createRange();
	
	range.selectNodeContents(textToCopy);
	selection.removeAllRanges();
	selection.addRange(range);
	
	document.execCommand('copy');
	selection.removeAllRanges();
  

  }

  let cpy = document.getElementById("cpy");
  let don = document.getElementById("done");
  
  let cpyp = document.getElementById("cpy-p");
  let donp = document.getElementById("done-p");

  
  // USAGE
  document.querySelector('.package-button').addEventListener('click', function() {
	copyToClipboard('.text');
	cpyp.style.visibility = 'hidden';
	donp.style.visibility = 'visible';
  });

  document.querySelector('.code-button').addEventListener('click', function() {
	copyToClipboard('.code-text');
	cpy.style.visibility = 'hidden';
	don.style.visibility = 'visible';
  });

  