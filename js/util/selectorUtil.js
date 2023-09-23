export function WrapSelector (element,className){
  return element.querySelector(className);
}

export function WrapQuerySelectorAll (element, className){
  const parent = typeof element === 'string' ? document.querySelector(element) : element;
  return parent.querySelectorAll(className);
}