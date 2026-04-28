
        const videoElement = document.getElementById('input_video');
        const loadingOverlay = document.getElementById('loading');
        const countdownEl = document.getElementById('countdown');
        const sessionStatus = document.getElementById('session-status');
        const poseCountEl = document.getElementById('pose-count');
        const stripContainer = document.getElementById('strip-container');
        const previewSection = document.getElementById('preview-section');
        const flashOverlay = document.getElementById('flash-overlay');
        const startBtn = document.getElementById('start-session-btn');
        const rotateBtn = document.getElementById('rotate-camera-btn');

        let isSessionActive = false;
        let capturedImages = [];
        let useFrontCamera = true;
        let cameraInstance = null;

        async function startCamera() {
            if (cameraInstance) await cameraInstance.stop();
            loadingOverlay.style.display = 'flex';
            loadingOverlay.style.opacity = '1';

            const facingMode = useFrontCamera ? "user" : "environment";
            videoElement.className = useFrontCamera ? "mirrored" : "";

            cameraInstance = new Camera(videoElement, {
                onFrame: async () => {
                    if (loadingOverlay.style.opacity !== '0') {
                        loadingOverlay.style.opacity = '0';
                        setTimeout(() => loadingOverlay.style.display = 'none', 500);
                    }
                },
                width: 1080,
                height: 1080,
                facingMode: facingMode
            });
            await cameraInstance.start();
        }

        rotateBtn.onclick = async () => {
            useFrontCamera = !useFrontCamera;
            await startCamera();
        };

        const takePhoto = (index) => {
            flashOverlay.classList.remove('flash-active');
            void flashOverlay.offsetWidth;
            flashOverlay.classList.add('flash-active');
            
            const tempCanvas = document.createElement('canvas');
            const size = 1080;
            tempCanvas.width = size;
            tempCanvas.height = size;
            const ctx = tempCanvas.getContext('2d');
            
            if (useFrontCamera) {
                ctx.translate(size, 0);
                ctx.scale(-1, 1);
            }

            const vW = videoElement.videoWidth;
            const vH = videoElement.videoHeight;
            const minDim = Math.min(vW, vH);
            const sx = (vW - minDim) / 2;
            const sy = (vH - minDim) / 2;

            ctx.drawImage(videoElement, sx, sy, minDim, minDim, 0, 0, size, size);
            
            const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.95);
            capturedImages.push(dataUrl);

            const img = document.createElement('img');
            img.src = dataUrl;
            stripContainer.appendChild(img);
            
            if(index === 4) {
                const footer = document.createElement('div');
                footer.className = 'strip-footer-text';
                footer.innerText = 'KHADKA BOOTH';
                stripContainer.appendChild(footer);
            }
            
            const dots = document.querySelectorAll('.dot');
            dots[index-1].classList.replace('bg-zinc-300', 'bg-zinc-900');
        };

        const startPhotoSession = async () => {
            if (isSessionActive) return;
            isSessionActive = true;
            capturedImages = [];
            stripContainer.innerHTML = '';
            previewSection.classList.add('hidden');
            
            document.querySelectorAll('.dot').forEach(d => d.className = "dot w-3 h-3 rounded-full bg-zinc-300");
            startBtn.classList.add('hidden');
            sessionStatus.classList.remove('hidden');
            sessionStatus.classList.add('flex');
            
            for (let i = 1; i <= 4; i++) {
                poseCountEl.innerText = i;
                for (let c = 3; c > 0; c--) {
                    countdownEl.innerText = c;
                    countdownEl.classList.remove('hidden');
                    await new Promise(r => setTimeout(r, 1000));
                }
                countdownEl.classList.add('hidden');
                takePhoto(i);
                await new Promise(r => setTimeout(r, 800));
            }

            sessionStatus.classList.add('hidden');
            previewSection.classList.remove('hidden');
            startBtn.classList.remove('hidden');
            startBtn.innerText = "Take Another Strip";
            isSessionActive = false;
            
            setTimeout(() => {
                previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        };

        const generateFinalStrip = () => {
            return new Promise((resolve) => {
                const finalCanvas = document.getElementById('final_strip_canvas');
                const fCtx = finalCanvas.getContext('2d');
                
                const imgSize = 1000;
                const gap = 30;
                const margin = 80;
                const brandingH = 200;
                
                finalCanvas.width = imgSize + (margin * 2);
                finalCanvas.height = (imgSize * 4) + (gap * 3) + (margin * 2) + brandingH;
                
                fCtx.fillStyle = 'white';
                fCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
                
                let loaded = 0;
                capturedImages.forEach((src, idx) => {
                    const img = new Image();
                    img.onload = () => {
                        const y = margin + (idx * (imgSize + gap));
                        fCtx.drawImage(img, margin, y, imgSize, imgSize);
                        
                        loaded++;
                        if (loaded === 4) {
                            fCtx.fillStyle = '#000';
                            fCtx.textAlign = 'center';
                            fCtx.font = '900 60px sans-serif';
                            fCtx.letterSpacing = "15px";
                            fCtx.fillText('KHADKA BOOTH', finalCanvas.width / 2, finalCanvas.height - 100);
                            
                            fCtx.font = 'italic 28px Georgia, serif';
                            fCtx.letterSpacing = "0px";
                            fCtx.fillStyle = '#666';
                            fCtx.fillText('Professional Quality • 2026', finalCanvas.width / 2, finalCanvas.height - 55);
                            
                            resolve(finalCanvas.toDataURL('image/jpeg', 0.98));
                        }
                    };
                    img.src = src;
                });
            });
        };

        startBtn.onclick = startPhotoSession;
        startCamera();

        document.getElementById('download-btn').onclick = async () => {
            const btn = document.getElementById('download-btn');
            btn.innerText = "Preparing High-Res...";
            const dataUrl = await generateFinalStrip();
            const link = document.createElement('a');
            link.download = `khadka-square-strip-${Date.now()}.jpg`;
            link.href = dataUrl;
            link.click();
            btn.innerText = "Save Strip";
        };
 
