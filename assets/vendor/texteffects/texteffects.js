// .split-text : Active split
// .split-[number] : Choose split animation
// .split-repeat : Repeat effect (default effect applied once)

addEventListener('page:loaded', function() {
    initSplit();
    initTextEffects();
})

function initSplit() {
    const split =  new SplitText('.split-text', {
        linesClass: 'line',
        wordsClass: 'word',
        charsClass: 'char',
    });
    
    const button = document.querySelector('#fe-wrapper .fe-edit');
    if(button) {
        button.addEventListener('mousedown', function(e) {
            document.querySelectorAll('.split-text').forEach(function(item, key) {
                split.revert();
            });
        });
    }
}

const wrapElements = function(elems, wrapType, wrapClass) {
    elems.forEach(char => {
        const wrapEl = document.createElement(wrapType);
        wrapEl.classList = wrapClass;
        char.parentNode.appendChild(wrapEl);
        wrapEl.appendChild(char);
    });
};

const getOnce = function(el) {
    if(el.classList.contains('split-repeat')) {
        return false;
    } else {
        return true;
    }
};

function initTextEffects() {
    const fx1Titles = document.querySelectorAll('.split-text.split-1');
    const fx2Titles = document.querySelectorAll('.split-text.split-2');
    const fx3Titles = document.querySelectorAll('.split-text.split-3');
    const fx4Titles = document.querySelectorAll('.split-text.split-4');
    const fx5Titles = document.querySelectorAll('.split-text.split-5');
    const fx6Titles = document.querySelectorAll('.split-text.split-6');
    const fx7Titles = document.querySelectorAll('.split-text.split-7');
    const fx8Titles = document.querySelectorAll('.split-text.split-8');
    const fx9Titles = document.querySelectorAll('.split-text.split-9');
    const fx10Titles = document.querySelectorAll('.split-text.split-10');
    const fx11Titles = document.querySelectorAll('.split-text.split-11');

    const fx12Titles = document.querySelectorAll('.split-text.split-12');
    const fx13Titles = document.querySelectorAll('.split-text.split-13');
    const fx14Titles = document.querySelectorAll('.split-text.split-14');
    const fx15Titles = document.querySelectorAll('.split-text.split-15');
    const fx16Titles = document.querySelectorAll('.split-text.split-16');
    const fx17Titles = document.querySelectorAll('.split-text.split-17');
    const fx18Titles = document.querySelectorAll('.split-text.split-18');
    const fx19Titles = document.querySelectorAll('.split-text.split-19');
    const fx20Titles = document.querySelectorAll('.split-text.split-20');

    const fx21Titles = document.querySelectorAll('.split-text.split-21');
    const fx22Titles = document.querySelectorAll('.split-text.split-22');

    
    fx1Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');

        gsap.fromTo(chars, { 
            'will-change': 'opacity, transform', 
            opacity: 0, 
            scale: 0.6,
            rotationZ: () => gsap.utils.random(-20,20)
        },
        {
            ease: 'power4',
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.4,
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            },
        });

    });
    
    fx2Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');

        gsap.fromTo(chars, { 
            'will-change': 'opacity, transform', 
            opacity: 0, 
            yPercent: 120, 
            scaleY: 2.3, 
            scaleX: 0.7, 
            transformOrigin: '50% 0%' 
        }, 
        {
            duration: 1,
            ease: 'back.inOut(2)',
            opacity: 1,
            yPercent: 0,
            scaleY: 1,
            scaleX: 1,
            stagger: 0.03,
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            }
        });

    });

    fx3Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');

        gsap.fromTo(chars,  { 
            'will-change': 'transform', 
            transformOrigin: '50% 0%', 
            scaleY: 0
        },
        {
            ease: 'back',
            opacity: 1,
            scaleY: 1,
            yPercent: 0,
            stagger: 0.03,
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            }
        });

    });

    fx4Titles.forEach(title => {
        
        const words = title.querySelectorAll('.word');
        
        for (const word of words) {
            
            const chars = word.querySelectorAll('.char');

            gsap.fromTo(chars,  { 
                'will-change': 'opacity, transform', 
                x: (position,_,arr) => 150*(position-arr.length/2) 
            },
            {
                ease: 'power1.inOut',
                x: 0,
                stagger: {
                    grid: 'auto',
                    from: 'center'
                },
                scrollTrigger: {
                    trigger: word,
                    start: 'center bottom',
                    end: 'top center+=10%',
                    scrub: true,
                    once: getOnce(title),
                }
            });

        };

    });

    fx5Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');

        gsap.fromTo(chars, { 
            'will-change': 'opacity, transform', 
            opacity: 0, 
            xPercent: () => gsap.utils.random(-200,200), 
            yPercent: () => gsap.utils.random(-150,150) 
        },
        {
            ease: 'power1.inOut',
            opacity: 1,
            xPercent: 0,
            yPercent: 0,
            stagger: { each: 0.05, grid: 'auto', from: 'random'},
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            }
        });

    });

    fx6Titles.forEach(title => {
        
        const words = title.querySelectorAll('.word');
        
        for (const word of words) {

            const chars = word.querySelectorAll('.char');

            chars.forEach(char => gsap.set(char.parentNode, { perspective: 2000 })); 

            gsap.fromTo(chars, { 
                'will-change': 'opacity, transform', 
                opacity: 0, 
                rotationX: -90,
                yPercent: 50
            },
            {
                ease: 'power1.inOut',
                opacity: 1,
                rotationX: 0,
                yPercent: 0,
                stagger: {
                    each: 0.03,
                    from: 0
                },
                scrollTrigger: {
                    trigger: word,
                    start: 'center bottom',
                    end: 'top center+=10%',
                    scrub: true,
                    once: getOnce(title),
                }
            });

        }

    });

    fx7Titles.forEach(title => {
        
        const words = title.querySelectorAll('.word');

        for (const word of words) {

            const chars = word.querySelectorAll('.char');

            chars.forEach(char => gsap.set(char.parentNode, { perspective: 2000 })); 

            gsap.fromTo(chars, { 
                'will-change': 'opacity, transform', 
                transformOrigin: '100% 50%',
                opacity: 0, 
                rotationY: -90,
                z: -300
            },
            {
                ease: 'expo',
                opacity: 1,
                rotationY: 0,
                z: 0,
                stagger: { each: 0.06, from: 'end'},
                scrollTrigger: {
                    trigger: word,
                    start: 'center bottom',
                    end: 'top center+=10%',
                    scrub: true,
                    once: getOnce(title),
                }
            });

        }

    });

    fx8Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');

        gsap.fromTo(chars, { 
            'will-change': 'opacity', 
            opacity: 0,
            filter: 'blur(20px)'
        },
        {
            duration: 0.25,
            ease: 'power1.inOut',
            opacity: 1,
            filter: 'blur(0px)',
            stagger: { each: 0.05, from: 'random'},
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                toggleActions: "play resume resume reset",
                scrub: true,
                once: getOnce(title),
            }
        });

    });

    fx9Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');
        wrapElements(chars, 'span', 'char-wrap');

        gsap.fromTo(chars, { 
            'will-change': 'transform', 
            transformOrigin: '0% 50%',
            xPercent: 105,
        }, 
        {
            duration: 1,
            ease: 'expo',
            xPercent: 0,
            stagger: 0.042,
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                toggleActions: "play resume resume reset",
                scrub: true,
                once: getOnce(title),
            }
        });

    });

    fx10Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');
        wrapElements(chars, 'span', 'char-wrap');
    
        gsap.fromTo(chars, { 
            'will-change': 'transform', 
            xPercent: -250,
            rotationZ: 45,
            scaleX: 6,
            transformOrigin: '100% 50%'
        },
        {
            duration: 1,
            ease: 'power2',
            xPercent: 0,
            rotationZ: 0,
            scaleX: 1,
            stagger: -0.06,
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            }
        });
    
    });

    fx11Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');
        
        chars.forEach(char => gsap.set(char.parentNode, { perspective: 2000 })); 

        gsap.fromTo(chars, { 
            'will-change': 'opacity, transform', 
            opacity: 0, 
            rotationY: 180,
            xPercent: -40,
            yPercent: 100
        },
        {
            ease: 'power4.inOut()',
            opacity: 1,
            rotationY: 0,
            xPercent: 0,
            yPercent: 0,
            stagger: {
                each: -0.03,
                from: 0
            },
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            }
        });

    });


    fx12Titles.forEach(title => {
        
        gsap.fromTo(title, {
            transformOrigin: '0% 50%',
            rotate: 3
        }, {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            }
        });

        gsap.fromTo(title.querySelectorAll('.word'), {
            'will-change': 'opacity',
            opacity: 0.1
        }, 
        {
            ease: 'none',
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            }
        });

    });

    fx13Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');
        
        chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 })); 
        
        gsap.fromTo(chars, { 
            'will-change': 'opacity, transform', 
            opacity: 0,
            rotateX: () => gsap.utils.random(-120,120),
            z: () => gsap.utils.random(-200,200),
        }, 
        {
            ease: 'none',
            opacity: 1,
            rotateX: 0,
            z: 0,
            stagger: 0.02,
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            }
        });

    });

    fx14Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');
        
        chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 })); 
        
        gsap.fromTo(chars, { 
            'will-change': 'opacity, transform', 
            opacity: 0.2,
            z: -800
        }, 
        {
            ease: 'back.out(1.2)',
            opacity: 1,
            z: 0,
            stagger: 0.04,
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            }
        });

    });

    fx15Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');
        
        chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 })); 
        
        gsap.fromTo(chars, {
            'will-change': 'opacity, transform', 
            transformOrigin: '50% 0%',
            opacity: 0,
            rotationX: -90,
            z: -200
        }, 
        {
            ease: 'power1',
            opacity: 1,
            stagger: 0.05,
            rotationX: 0,
            z: 0,
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            }
        });
        
    });

    fx16Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');
        
        chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 })); 
        
        gsap.fromTo(chars, {
            'will-change': 'opacity, transform', 
            transformOrigin: '50% 100%',
            opacity: 0,
            rotationX: 90
        }, 
        {
            ease: 'power4',
            opacity: 1,
            stagger:  {
                each: 0.03,
                from: 'random'
            },
            rotationX: 0,
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            }
        });
        
    });

    fx17Titles.forEach(title => {
        
        const words = [...title.querySelectorAll('.word')];
        
        for (const word of words) {
            
            const chars = word.querySelectorAll('.char');
        
            chars.forEach(char => gsap.set(char.parentNode, { perspective: 2000 })); 

            gsap.fromTo(chars, {
                'will-change': 'opacity, transform', 
                opacity: 0,
                y: (position,_,arr) => -40*Math.abs(position-arr.length/2),
                z: () => gsap.utils.random(-1500,-600),
                rotationX: () => gsap.utils.random(-500,-200)
            }, 
            {
                ease: 'power1.inOut',
                opacity: 1,
                y: 0,
                z: 0,
                rotationX: 0,
                stagger: {
                    each: 0.06,
                    from: 'center'
                },
                scrollTrigger: {
                    trigger: word,
                    start: 'center bottom',
                    end: 'top center+=10%',
                    scrub: true,
                    once: getOnce(title),
                }
            });

        }

    });

    fx18Titles.forEach(title => {
        
        const words = [...title.querySelectorAll('.word')];
        
        for (const word of words) {
            const chars = word.querySelectorAll('.char');
            const charsTotal = chars.length;

            chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 })); 
            
            gsap.fromTo(chars, {
                'will-change': 'transform', 
                x: position => {
                    const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                    return (charsTotal%2 ? Math.abs(Math.ceil(charsTotal/2)-1-factor) : Math.abs(Math.ceil(charsTotal/2)-factor) )*200*(position < charsTotal/2 ? -1 : 1);
                },
                y: position => {
                    const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                    return factor*60;
                },
                rotationY: -270,
                rotationZ: position => {
                    const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                    return position < charsTotal/2 ? Math.abs(factor-charsTotal/2)*8 : -1*Math.abs(factor-charsTotal/2)*8;
                }
            }, 
            {
                ease: 'power2.inOut',
                x: 0,
                y: 0,
                rotationZ: 0,
                rotationY: 0,
                scale: 1,
                scrollTrigger: {
                    trigger: word,
                    start: 'center bottom',
                    end: 'top center+=10%',
                    scrub: true,
                    once: getOnce(title),
                }
            });

        }

    });

    fx19Titles.forEach(title => {
        
        const words = [...title.querySelectorAll('.word')];
        
        for (const [wordPosition, word] of words.entries()) {

            gsap.fromTo(word.querySelectorAll('.char'), {
                'will-change': 'transform', 
                scale: 0.01,
                x: (pos,_,arr) => {
                    return wordPosition%2 ? pos*50 : (arr.length-pos-1)*-50
                }
            }, 
            {
                ease: 'power4',
                scale: 1,
                x: 0,
                scrollTrigger: {
                    trigger: word,
                    start: 'center bottom',
                    end: 'top center+=10%',
                    scrub: true,
                    once: getOnce(title),
                }
            });
            
        }
        
    });

    fx20Titles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');
        const charsTotal = chars.length;
        
        gsap.fromTo(chars, {
            'will-change': 'transform', 
            y: position => {
                const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                return (charsTotal/2-factor+6)*130;
            }
        }, 
        {
            ease: 'elastic.out(.4)',
            y: 0,
            stagger: {
                amount: 0.1,
                from: 'center'
            },
            scrollTrigger: {
                trigger: title,
                start: 'center bottom',
                end: 'top center+=10%',
                scrub: true,
                once: getOnce(title),
            }
        });

    });

    fx21Titles.forEach(title => {
        
        const words = [...title.querySelectorAll('.word')];
        
        for (const word of words) {

            const chars = word.querySelectorAll('.char');
            const charsTotal = chars.length;
            
            gsap.fromTo(chars, {
                'will-change': 'transform, filter', 
                transformOrigin: '50% 100%',
                scale: position => {
                    const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                    return gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0.5, 2.1, factor);
                },
                y: position => {
                    const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                    return gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0, 60, factor);
                },
                rotation: position => {
                    const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
                    return position < charsTotal/2 ? gsap.utils.mapRange(0, Math.ceil(charsTotal/2), -4, 0, factor) : gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0, 4, factor);
                },
                filter: 'blur(12px) opacity(0)',
            }, 
            {
                ease: 'power2.inOut',
                y: 0,
                rotation: 0,
                scale: 1,
                filter: 'blur(0px) opacity(1)',
                scrollTrigger: {
                    trigger: word,
                    start: 'center bottom',
                    end: 'top center+=10%',
                    scrub: true,
                    once: getOnce(title),
                },
                stagger: {
                    amount: 0.15,
                    from: 'center'
                }
            });

        }

    });

    fx22Titles.forEach(title => {
        
        const words = [...title.querySelectorAll('.word')];
        
        for (const [pos,word] of words.entries()) {
            
            const chars = word.querySelectorAll('.char');
            
            gsap.fromTo(chars, {
                'will-change': 'transform', 
                transformOrigin: `${pos%2 ? 0 : 100}% ${pos%2 ? 100 : 0}%`,
                scale: 0
            }, 
            {
                ease: 'power4',
                scale: 1,
                stagger:  {
                    each: 0.03,
                    from: pos%2 ? 'end' : 'start'
                },
                scrollTrigger: {
                    trigger: word,
                    start: 'center bottom',
                    end: 'top center+=10%',
                    scrub: true,
                    once: getOnce(title),
                }
            });
        }
        
    });
    
}

