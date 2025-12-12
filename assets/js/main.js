import { faqSeed } from './data/faqData.js';
import { knowledgeCategoriesSeed } from './data/knowledgeCategories.js';

// ==================== 版本标识 ====================
const APP_VERSION = 'v2.0.0-fix-20251212';
console.log('%c🚀 应用版本: ' + APP_VERSION, 'color: #1677FF; font-size: 16px; font-weight: bold;');
console.log('%c📅 加载时间: ' + new Date().toLocaleString('zh-CN'), 'color: #10b981;');

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 DOMContentLoaded 事件触发');

    // ==================== DOM元素获取与验证 ====================
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('file-input');
    const filePreviewContainer = document.getElementById('file-preview-container');
    const filePreviewList = document.getElementById('file-preview-list');
    const chatHistory = document.getElementById('chat-history');
    const emptyState = document.getElementById('empty-state');
    const chatContainer = document.getElementById('chat-container');
    const previewToggle = document.getElementById('preview-toggle');
    const previewCount = document.getElementById('preview-count');
    const statsPanel = document.getElementById('stats-panel');
    const statsOverlay = document.getElementById('stats-overlay');
    const statsClose = document.getElementById('stats-close');
    const statsPanelMain = document.getElementById('stats-panel-main');
    const statsMainOverlay = document.getElementById('stats-main-overlay');
    const statsResizeHandle = document.getElementById('stats-resize-handle');
    const statsMainClose = document.getElementById('stats-main-close');
    const knowledgePanel = document.getElementById('knowledge-panel');
    const knowledgeOverlay = document.getElementById('knowledge-overlay');
    const knowledgeClose = document.getElementById('knowledge-close');
    const detailPanel = document.getElementById('detail-panel');
    const detailOverlay = document.getElementById('detail-overlay');
    const detailClose = document.getElementById('detail-close');
    const exceptionPanelBody = document.getElementById('exception-panel-body');
    const exceptionListView = document.getElementById('exception-list-view');
    const exceptionDetailView = document.getElementById('exception-detail-view');
    const exceptionDetailContent = document.getElementById('exception-detail-content');
    const exceptionDetailTitle = document.getElementById('exception-detail-title');
    const exceptionDetailType = document.getElementById('exception-detail-type');
    const exceptionDetailPriority = document.getElementById('exception-detail-priority');
    const exceptionDetailTime = document.getElementById('exception-detail-time');
    const exceptionBackBtn = document.getElementById('exception-back-btn');

    // 验证关键DOM元素
    console.log('🔍 关键元素检查:');
    console.log('  - messageInput:', messageInput ? '✅' : '❌');
    console.log('  - sendBtn:', sendBtn ? '✅' : '❌');
    console.log('  - chatHistory:', chatHistory ? '✅' : '❌');

    if (!messageInput || !sendBtn || !chatHistory) {
        console.error('❌ 关键DOM元素未找到，请检查HTML结构！');
        alert('页面初始化失败，请刷新页面重试！');
        return;
    }
    const exceptionPanel = document.getElementById('exception-panel');
    const exceptionOverlay = document.getElementById('exception-overlay');
    const exceptionClose = document.getElementById('exception-close');
    let previewCollapsed = false;

    // ========== 辅助函数 ==========
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const scrollToBottom = () => {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };

    const updateActionButtons = () => {
        const hasText = messageInput.value.trim() !== '';
        const hasFiles = filePreviewList.children.length > 0;
        if (hasText || hasFiles) {
            sendBtn.classList.remove('hidden');
        } else {
            sendBtn.classList.add('hidden');
        }
    };

    const syncPreviewCollapse = (forceDefault = false) => {
        const items = Array.from(filePreviewList.children);
        const count = items.length;
        if (previewCount) previewCount.textContent = count;

        if (count === 0) {
            filePreviewContainer.classList.add('hidden');
            previewCollapsed = false;
            return;
        }

        filePreviewContainer.classList.remove('hidden');

        if (count > 5 && forceDefault && !previewCollapsed) {
            previewCollapsed = true;
        }

        if (count <= 5) {
            previewCollapsed = false;
        }

        items.forEach((item, index) => {
            const shouldHide = previewCollapsed && index >= 5;
            item.classList.toggle('hidden', shouldHide);
        });

        if (previewToggle) {
            previewToggle.querySelector('span').textContent = previewCollapsed ? '展开' : '收起';
            const icon = previewToggle.querySelector('i');
            if (icon) icon.className = previewCollapsed ? 'fa fa-chevron-down' : 'fa fa-chevron-up';
        }
    };

    const openStatsPanel = () => {
        statsPanel.classList.remove('translate-x-full');
        if (statsOverlay) statsOverlay.classList.remove('hidden');
    };

    const closeStatsPanel = () => {
        statsPanel.classList.add('translate-x-full');
        if (statsOverlay) statsOverlay.classList.add('hidden');
    };

    if (statsOverlay) {
        statsOverlay.addEventListener('click', closeStatsPanel);
    }

    if (statsClose) {
        statsClose.addEventListener('click', closeStatsPanel);
    }

    // 统计面板(新)
    const openStatsPanelMain = () => {
        if (statsPanelMain) {
            const savedWidth = localStorage.getItem('stats-panel-width');
            if (savedWidth) {
                statsPanelMain.style.width = `${savedWidth}px`;
            }
            statsPanelMain.classList.remove('translate-x-full');
            if (statsMainOverlay) statsMainOverlay.classList.remove('hidden');
        }
    };

    const closeStatsPanelMain = () => {
        if (statsPanelMain) {
            statsPanelMain.classList.add('translate-x-full');
        }
        if (statsMainOverlay) statsMainOverlay.classList.add('hidden');
    };

    if (statsMainClose) {
        statsMainClose.addEventListener('click', closeStatsPanelMain);
    }
    if (statsMainOverlay) {
        statsMainOverlay.addEventListener('click', closeStatsPanelMain);
    }

    // 知识管理面板
    const openKnowledgePanel = () => {
        if (knowledgePanel) {
            knowledgePanel.classList.remove('translate-x-full');
            if (knowledgeOverlay) knowledgeOverlay.classList.remove('hidden');
        }
    };

    const closeKnowledgePanel = () => {
        if (knowledgePanel) {
            knowledgePanel.classList.add('translate-x-full');
            if (knowledgeOverlay) knowledgeOverlay.classList.add('hidden');
        }
    };

    if (knowledgeOverlay) {
        knowledgeOverlay.addEventListener('click', closeKnowledgePanel);
    }

    if (knowledgeClose) {
        knowledgeClose.addEventListener('click', closeKnowledgePanel);
    }

    // 统计面板宽度调整功能（与知识/异常保持一致）
    if (statsResizeHandle && statsPanelMain) {
        let isResizingStats = false;
        let startXStats = 0;
        let startWidthStats = 0;

        statsResizeHandle.addEventListener('mousedown', (e) => {
            isResizingStats = true;
            startXStats = e.clientX;
            startWidthStats = statsPanelMain.offsetWidth;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            statsPanelMain.style.transition = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizingStats) return;
            const delta = startXStats - e.clientX;
            let newWidth = startWidthStats + delta;
            newWidth = Math.max(500, Math.min(1200, newWidth));
            statsPanelMain.style.width = `${newWidth}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isResizingStats) {
                isResizingStats = false;
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                statsPanelMain.style.transition = '';
                const width = statsPanelMain.offsetWidth;
                localStorage.setItem('stats-panel-width', width);
            }
        });

        statsResizeHandle.addEventListener('dblclick', () => {
            const defaultWidth = 720;
            statsPanelMain.style.width = `${defaultWidth}px`;
            localStorage.setItem('stats-panel-width', defaultWidth);
        });

        const savedStatsWidth = localStorage.getItem('stats-panel-width');
        if (savedStatsWidth) {
            statsPanelMain.style.width = `${savedStatsWidth}px`;
        }
    }

    // 知识管理面板宽度调整功能
    const panelResizeHandle = document.getElementById('panel-resize-handle');
    if (panelResizeHandle && knowledgePanel) {
        let isResizingPanel = false;
        let startXPanel = 0;
        let startWidthPanel = 0;

        panelResizeHandle.addEventListener('mousedown', (e) => {
            isResizingPanel = true;
            startXPanel = e.clientX;
            startWidthPanel = knowledgePanel.offsetWidth;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            // 暂时移除transition以实现流畅拖拽
            knowledgePanel.style.transition = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizingPanel) return;

            // 计算新宽度（从右侧拖拽，所以是 startX - currentX）
            const delta = startXPanel - e.clientX;
            let newWidth = startWidthPanel + delta;

            // 限制宽度范围 400px - 1200px
            newWidth = Math.max(400, Math.min(1200, newWidth));

            knowledgePanel.style.width = `${newWidth}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isResizingPanel) {
                isResizingPanel = false;
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                // 恢复transition
                knowledgePanel.style.transition = '';

                // 保存宽度到localStorage
                const width = knowledgePanel.offsetWidth;
                localStorage.setItem('knowledge-panel-width', width);
            }
        });

        // 双击重置宽度
        panelResizeHandle.addEventListener('dblclick', () => {
            knowledgePanel.style.width = '800px';
            localStorage.setItem('knowledge-panel-width', '800');
        });

        // 从localStorage恢复宽度
        const savedPanelWidth = localStorage.getItem('knowledge-panel-width');
        if (savedPanelWidth) {
            knowledgePanel.style.width = `${savedPanelWidth}px`;
        }
    }

    // 异常管理面板宽度调整功能
    const exceptionResizeHandle = document.getElementById('exception-resize-handle');
    if (exceptionResizeHandle && exceptionPanel) {
        let isResizingException = false;
        let startXException = 0;
        let startWidthException = 0;

        exceptionResizeHandle.addEventListener('mousedown', (e) => {
            isResizingException = true;
            startXException = e.clientX;
            startWidthException = exceptionPanel.offsetWidth;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            // 暂时移除transition以实现流畅拖拽
            exceptionPanel.style.transition = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizingException) return;

            // 计算新宽度（从右侧拖拽，所以是 startX - currentX）
            const delta = startXException - e.clientX;
            let newWidth = startWidthException + delta;

            // 限制宽度范围 500px - 1200px
            newWidth = Math.max(500, Math.min(1200, newWidth));

            exceptionPanel.style.width = `${newWidth}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isResizingException) {
                isResizingException = false;
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                // 恢复transition
                exceptionPanel.style.transition = '';

                // 保存宽度到localStorage
                const width = exceptionPanel.offsetWidth;
                localStorage.setItem('exception-panel-width', width);
            }
        });

        // 双击重置宽度
        exceptionResizeHandle.addEventListener('dblclick', () => {
            exceptionPanel.style.width = '720px';
            localStorage.setItem('exception-panel-width', '720');
        });

        // 从localStorage恢复宽度
        const savedExceptionWidth = localStorage.getItem('exception-panel-width');
        if (savedExceptionWidth) {
            exceptionPanel.style.width = `${savedExceptionWidth}px`;
        }
    }

    // 库类型切换（文档库 / FAQ库）
    const tabDocLibrary = document.getElementById('tab-doc-library');
    const tabFaqLibrary = document.getElementById('tab-faq-library');
    const docLibraryContent = document.getElementById('doc-library-content');
    const faqLibraryContent = document.getElementById('faq-library-content');

    if (tabDocLibrary) {
        tabDocLibrary.addEventListener('click', () => {
            // 切换标签样式
            tabDocLibrary.classList.add('border-teal-600', 'text-teal-600', 'bg-teal-50');
            tabDocLibrary.classList.remove('border-transparent', 'text-text-secondary');
            tabFaqLibrary.classList.remove('border-teal-600', 'text-teal-600', 'bg-teal-50');
            tabFaqLibrary.classList.add('border-transparent', 'text-text-secondary');

            // 切换内容区域
            if (docLibraryContent) {
                docLibraryContent.classList.remove('hidden');
                docLibraryContent.classList.add('flex');
            }
            if (faqLibraryContent) {
                faqLibraryContent.classList.add('hidden');
                faqLibraryContent.classList.remove('flex');
            }
        });
    }

    if (tabFaqLibrary) {
        tabFaqLibrary.addEventListener('click', () => {
            // 切换标签样式
            tabFaqLibrary.classList.add('border-teal-600', 'text-teal-600', 'bg-teal-50');
            tabFaqLibrary.classList.remove('border-transparent', 'text-text-secondary');
            tabDocLibrary.classList.remove('border-teal-600', 'text-teal-600', 'bg-teal-50');
            tabDocLibrary.classList.add('border-transparent', 'text-text-secondary');

            // 切换内容区域
            if (faqLibraryContent) {
                faqLibraryContent.classList.remove('hidden');
                faqLibraryContent.classList.add('flex');
            }
            if (docLibraryContent) {
                docLibraryContent.classList.add('hidden');
                docLibraryContent.classList.remove('flex');
            }

            // 加载FAQ列表
            loadFaqList();
        });
    }

    // 删除旧的标签页逻辑，因为我们已经改为库类型切换
    const tabDocuments = document.getElementById('tab-documents');
    const tabFaq = document.getElementById('tab-faq');

    if (false && tabFaq) {  // 禁用旧代码
        tabFaq.addEventListener('click', () => {
            // 切换标签样式
            tabFaq.classList.add('border-teal-600', 'text-teal-600');
            tabFaq.classList.remove('border-transparent', 'text-text-secondary');
            tabDocuments.classList.remove('border-teal-600', 'text-teal-600');
            tabDocuments.classList.add('border-transparent', 'text-text-secondary');
            // 切换内容
            if (contentFaq) contentFaq.classList.remove('hidden');
            if (contentDocuments) contentDocuments.classList.add('hidden');
        });
    }

    if (previewToggle) {
        previewToggle.addEventListener('click', () => {
            previewCollapsed = !previewCollapsed;
            syncPreviewCollapse();
        });
    }

    const formatFileSize = (bytes) => {
        if (!bytes) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };

    const addUserMessage = (text) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex justify-end';
        wrapper.innerHTML = `
            <div class="max-w-[70%]">
                <div class="flex items-center justify-end mb-1">
                    <span class="text-xs text-text-secondary mr-2">您</span>
                </div>
                <div class="message-bubble-user p-3">
                    <p>${text}</p>
                </div>
            </div>
        `;
        chatHistory.appendChild(wrapper);
    };

    const addFileToChat = (name, size) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex justify-end';
        messageDiv.innerHTML = `
            <div class="max-w-[70%]">
                <div class="flex items-center justify-end mb-1">
                    <span class="text-xs text-text-secondary mr-2">您</span>
                </div>
                <div class="message-bubble-user p-3">
                    <div class="flex items-center bg-blue-700 p-2 rounded-lg">
                        <i class="fa fa-file-o text-white mr-2"></i>
                        <div class="flex-1">
                            <p class="text-sm font-medium truncate">${name}</p>
                            <p class="text-xs text-blue-100">${size}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        chatHistory.appendChild(messageDiv);
    };

    const addSystemMessage = (text) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex';
        wrapper.innerHTML = `
            <div class="max-w-[70%]">
                <div class="flex items-center mb-1">
                    <div class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                        <i class="fa fa-robot text-xs"></i>
                    </div>
                    <span class="text-xs text-text-secondary">智能助手</span>
                </div>
                <div class="message-bubble-system p-3">
                    <p>${text}</p>
                </div>
            </div>
        `;
        chatHistory.appendChild(wrapper);
    };

    const addSearchResultMessage = (query) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex fade-in';
        const results = [
            { name: '销售数据Q3.xlsx', size: '2.5 MB', date: '2023-10-15' },
            { name: '往年销售对比.pdf', size: '1.2 MB', date: '2023-09-20' }
        ];
        const resultsHtml = results.map(file => `
            <div class="bg-white border border-border-light rounded-lg p-3 mb-2 hover:shadow-sm transition-all">
                <div class="flex items-start justify-between">
                    <div class="flex items-center">
                        <div class="w-8 h-8 rounded bg-blue-100 text-primary flex items-center justify-center mr-3">
                            <i class="fa ${file.name.endsWith('pdf') ? 'fa-file-pdf-o' : 'fa-file-excel-o'}"></i>
                        </div>
                        <div>
                            <p class="font-medium text-sm text-text-primary">${file.name}</p>
                            <p class="text-xs text-text-secondary">${file.size} • ${file.date}</p>
                        </div>
                    </div>
                    <div class="flex space-x-1">
                        <button class="p-1 text-text-secondary hover:text-primary transition-colors" title="查看">
                            <i class="fa fa-eye"></i>
                        </button>
                        <button class="p-1 text-text-secondary hover:text-error transition-colors delete-file-btn"
                            data-name="${file.name}" title="删除">
                            <i class="fa fa-trash-o"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        wrapper.innerHTML = `
            <div class="max-w-[85%]">
                <div class="flex items-center mb-1">
                    <div class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                        <i class="fa fa-robot text-xs"></i>
                    </div>
                    <span class="text-xs text-text-secondary">智能助手</span>
                </div>
                <div class="message-bubble-system p-4 bg-gray-50 border border-border-light">
                    <p class="mb-3 text-text-primary">🔍 为您找到以下与"${query}"相关的内容：</p>
                    ${resultsHtml}
                    <button
                        class="w-full py-2 text-center text-sm text-primary hover:text-secondary transition-colors border-t border-gray-200 mt-1">
                        查看更多结果
                    </button>
                </div>
            </div>
        `;

        chatHistory.appendChild(wrapper);
    };

    const clearInputState = () => {
        messageInput.value = '';
        filePreviewList.innerHTML = '';
        syncPreviewCollapse();
        updateActionButtons();
    };

    const addStatsMessage = () => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex';
        wrapper.innerHTML = `
            <div class="max-w-[70%]">
                <div class="flex items-center mb-1">
                    <div class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                        <i class="fa fa-robot text-xs"></i>
                    </div>
                    <span class="text-xs text-text-secondary">智能助手</span>
                </div>
                <div class="message-bubble-system p-3">
                    <p class="mb-3">统计分析结果已生成，可点击查看详细图表。</p>
                    <div class="flex space-x-2">
                        <button class="btn-primary text-sm px-3 py-1.5 open-stats-btn">查看统计面板</button>
                        <button class="btn-secondary text-sm px-3 py-1.5">发送摘要</button>
                    </div>
                </div>
            </div>
        `;
        chatHistory.appendChild(wrapper);
        const openBtn = wrapper.querySelector('.open-stats-btn');
        if (openBtn) {
            openBtn.addEventListener('click', openStatsPanelMain);
        }
    };

    const addExceptionMessage = () => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex';
        wrapper.innerHTML = `
            <div class="max-w-[70%]">
                <div class="flex items-center mb-1">
                    <div class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                        <i class="fa fa-robot text-xs"></i>
                    </div>
                    <span class="text-xs text-text-secondary">智能助手</span>
                </div>
                <div class="message-bubble-system p-3">
                    <p class="mb-3">已为您准备异常处理入口，可批量管理文档冲突、待分类文档和FAQ待审。</p>
                    <div class="flex space-x-2">
                        <button class="btn-primary text-sm px-3 py-1.5 open-exception-btn">打开异常处理面板</button>
                        <button class="btn-secondary text-sm px-3 py-1.5">继续对话处理</button>
                    </div>
                </div>
            </div>
        `;
        chatHistory.appendChild(wrapper);
        const openBtn = wrapper.querySelector('.open-exception-btn');
        if (openBtn) {
            openBtn.addEventListener('click', openExceptionPanel);
        }
    };

    const addKnowledgeManagementMessage = () => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex';
        wrapper.innerHTML = `
            <div class="max-w-[70%]">
                <div class="flex items-center mb-1">
                    <div class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                        <i class="fa fa-robot text-xs"></i>
                    </div>
                    <span class="text-xs text-text-secondary">智能助手</span>
                </div>
                <div class="message-bubble-system p-3">
                    <p class="mb-3">已为您准备知识管理入口，可以查看文档库和FAQ库。</p>
                    <div class="flex space-x-2">
                        <button class="btn-primary text-sm px-3 py-1.5 open-knowledge-btn">打开知识管理面板</button>
                        <button class="btn-secondary text-sm px-3 py-1.5">继续对话处理</button>
                    </div>
                </div>
            </div>
        `;
        chatHistory.appendChild(wrapper);
        const openBtn = wrapper.querySelector('.open-knowledge-btn');
        if (openBtn) {
            openBtn.addEventListener('click', openKnowledgePanel);
        }
    };

    const sendMessage = () => {
        console.log('📤 sendMessage 函数被调用');
        const text = messageInput.value.trim();
        const files = Array.from(filePreviewList.children);
        console.log('📝 消息内容:', text);
        console.log('📎 文件数量:', files.length);

        if (!text && files.length === 0) {
            console.log('❌ 消息为空，取消发送');
            return;
        }

        console.log('✅ 开始发送消息');
        if (emptyState) {
            emptyState.classList.add('hidden');
        }
        chatHistory.classList.remove('hidden');

        if (text) {
            addUserMessage(text);
        }

        files.forEach((item) => {
            const name = item.getAttribute('data-name');
            const size = item.getAttribute('data-size');
            addFileToChat(name, size);
        });

        clearInputState();
        scrollToBottom();

        setTimeout(() => {
            addSystemMessage('正在处理您的请求，请稍候...');
            scrollToBottom();

            setTimeout(() => {
                const lower = text.toLowerCase();
                if (text.includes('统计') || text.includes('分析') || text.includes('数据')) {
                    // 统计分析相关
                    addStatsMessage();
                } else if (text.includes('异常') && (text.includes('处理') || text.includes('查看') || text.includes('批量'))) {
                    // 异常处理相关
                    addExceptionMessage();
                } else if (text.includes('知识') && (text.includes('管理') || text.includes('库'))) {
                    // 知识管理相关
                    addKnowledgeManagementMessage();
                } else if (text.includes('搜索') || text.includes('查找') || text.includes('找')) {
                    addSearchResultMessage(text);
                } else {
                    addSystemMessage('我已完成您的请求，这是处理结果。');
                }
                scrollToBottom();
            }, 800);
        }, 500);
    };

    const makeUniqueName = (name) => {
        const existing = new Set(
            Array.from(filePreviewList.children).map((item) => item.getAttribute('data-name'))
        );
        if (!existing.has(name)) return name;

        const dotIndex = name.lastIndexOf('.');
        const base = dotIndex > -1 ? name.slice(0, dotIndex) : name;
        const ext = dotIndex > -1 ? name.slice(dotIndex) : '';

        let counter = 1;
        let candidate = '';
        do {
            candidate = `${base}(${counter})${ext}`;
            counter += 1;
        } while (existing.has(candidate));

        return candidate;
    };

    const addFilePreview = (file) => {
        const uniqueName = makeUniqueName(file.name);
        const sizeText = formatFileSize(file.size);
        const fileItem = document.createElement('div');
        fileItem.className = 'flex items-center justify-between bg-gray-50 p-2 rounded-lg';
        fileItem.setAttribute('data-name', uniqueName);
        fileItem.setAttribute('data-size', sizeText);
        fileItem.innerHTML = `
            <div class="flex items-center">
                <i class="fa fa-file-o text-primary mr-2"></i>
                <div>
                    <p class="text-sm font-medium truncate">${uniqueName}</p>
                    <p class="text-xs text-text-secondary">${sizeText}</p>
                </div>
            </div>
            <button class="text-text-secondary hover:text-error remove-file">
                <i class="fa fa-times"></i>
            </button>
        `;

        fileItem.querySelector('.remove-file').addEventListener('click', () => {
            fileItem.remove();
            syncPreviewCollapse();
            updateActionButtons();
        });

        filePreviewList.appendChild(fileItem);
        syncPreviewCollapse(true);
    };

    // ========== 增强的文件上传逻辑（需要先定义）==========
    async function handleEnhancedFileUpload(files) {
        if (!files || files.length === 0) return;

        const file = files[0]; // 处理第一个文件

        // 1. 显示上传中消息
        addSystemMessage(`正在上传文件：${file.name}`);
        await sleep(500);

        // 2. 模拟file hash检测
        const isDuplicate = Math.random() < 0.2; // 20%概率重复
        if (isDuplicate) {
            const filenameSame = Math.random() < 0.5;
            if (filenameSame) {
                // 场景1：完全重复
                addSystemMessage(`检测到文档已存在：《${file.name}》
录入时间：2024-11-28 10:00:00
录入人：张经理

这两份文档内容完全一样，不需要重复处理。`);
                return;
            } else {
                // 场景2：内容相同但文件名不同
                addSystemMessageWithActions(`文档内容已存在，但文件名不同：
已有文档：《2024年${file.name}》
新文件名：《${file.name}》

您希望：`, [
                    { label: '保持原文件名', action: 'keep_existing' },
                    { label: '更新文件名', action: 'update_filename' },
                    { label: '取消', action: 'cancel' }
                ]);
                return;
            }
        }

        // 3. 显示L0-L2处理进度
        const progressMsg = createProgressMessage();

        await sleep(500);
        updateProgressStage(progressMsg, 'l0', 'processing');
        await sleep(800);
        updateProgressStage(progressMsg, 'l0', 'completed');

        updateProgressStage(progressMsg, 'l1', 'processing');
        await sleep(2000);
        updateProgressStage(progressMsg, 'l1', 'completed');

        updateProgressStage(progressMsg, 'l2', 'processing');
        await sleep(1500);
        updateProgressStage(progressMsg, 'l2', 'completed');

        // 4. 相似度检测
        const hasSimilar = Math.random() < 0.3; // 30%概率发现相似
        if (hasSimilar) {
            await sleep(500);
            addSystemMessageWithActions(`检测到相似内容！

相似文档：《2024年产假政策》
相似度：92%

主要差异：
• 新增体检医院信息
• 更新银行卡要求`, [
                { label: '处理', icon: 'cog', action: 'open_conflict_panel', data: {
                    similarDoc: { title: '2024年产假政策', created_at: '2024-11-28 10:00:00' },
                    similarity: 92,
                    differences: ['新增体检医院信息', '更新银行卡要求']
                }}
            ]);
            return;
        }

        // 5. L3处理（分类、标签、摘要）
        await sleep(500);
        updateProgressMessage(progressMsg, '正在提取知识...');
        updateProgressStage(progressMsg, 'l3', 'processing');
        await sleep(2000);
        updateProgressStage(progressMsg, 'l3', 'completed');

        const categoryConfidence = Math.random();
        if (categoryConfidence < 0.7) {
            // 分类置信度低，需要确认
            await sleep(500);
            addSystemMessageWithActions(`文档上传成功！但我不太确定这份文档的分类：

我的猜测（不确定）：
• 公司主体：集团总部（置信度${Math.round(categoryConfidence * 100)}%）
• 业务领域：员工福利/假期管理

能帮我确认一下吗？`, [
                { label: '确认分类', icon: 'folder', action: 'open_category_panel', data: {
                    category: { company_entity: '集团总部', business_domain: '员工福利/假期管理' },
                    categoryConfidence: categoryConfidence,
                    tags: ['产假', '陪产假', '生育津贴'],
                    summary: '规定员工产假、陪产假的天数和生育津贴的领取流程'
                }}
            ]);
            return;
        }

        // 6. QA挖掘（智能推荐模式）
        await sleep(500);
        updateProgressMessage(progressMsg, '正在挖掘FAQ...');
        updateProgressStage(progressMsg, 'qa', 'processing');
        await sleep(2000);
        updateProgressStage(progressMsg, 'qa', 'completed');

        // 智能分类：高置信度自动入库，低置信度或冲突需要审核
        const totalFaqs = Math.floor(Math.random() * 20) + 10;
        const needReviewCount = Math.floor(Math.random() * 5);
        const autoApprovedCount = totalFaqs - needReviewCount;

        if (needReviewCount > 0) {
            await sleep(500);
            addSystemMessageWithActions(`从文档中挖掘出 ${totalFaqs} 条FAQ：
• 自动入库：${autoApprovedCount} 条（高置信度）
• 需要审核：${needReviewCount} 条（低置信度或与已有FAQ相似）`, [
                { label: '审核FAQ', icon: 'question-circle', action: 'open_faq_panel', data: {
                    needReview: [{
                        question: '产假有多少天？',
                        answer: '根据最新政策，产假为158天，包括基本产假98天和延长产假60天。',
                        similar_qa: {
                            question: '产假天数是多少？',
                            answer: '根据2024年政策，产假为128天...'
                        },
                        similarity: 0.95
                    }],
                    autoApproved: []
                }}
            ]);
        } else {
            // 全部自动入库
            await sleep(500);
            addSystemMessage(`文档处理完成！

• 文档已入库，可正常检索
• 自动分类：员工福利/假期管理
• 提取标签：产假、陪产假、生育津贴
• 挖掘FAQ：${totalFaqs} 条（已自动入库）`);
        }
    }

    uploadBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async (event) => {
        const files = Array.from(event.target.files || []);
        files.forEach(addFilePreview);
        updateActionButtons();

        // 触发完整的文档处理流程
        if (files.length > 0) {
            await handleEnhancedFileUpload(files);
        }
    });

    sendBtn.addEventListener('click', () => {
        console.log('🖱️ 点击发送按钮');
        sendMessage();
    });

    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            console.log('⌨️ 按下Enter键');
            event.preventDefault();
            sendMessage();
        }
    });

    messageInput.addEventListener('input', updateActionButtons);

    const commandCards = document.querySelectorAll('.command-card');
    console.log('🔧 找到快捷指令数量:', commandCards.length);
    commandCards.forEach((card, index) => {
        const title = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : '';
        console.log(`🔧 注册快捷指令 ${index + 1}:`, title);
        card.addEventListener('click', () => {
            if (!title) return;

            console.log('🖱️ 点击快捷指令:', title);
            // 所有卡片：填入输入框，通过对话式交互触发
            messageInput.value = title;
            messageInput.focus();
            updateActionButtons();
            console.log('✅ 已填充到输入框，当前值:', messageInput.value);
        });
    });

    updateActionButtons();

    // ========== 新功能：进度条组件 ==========
    function createProgressMessage() {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex fade-in';
        wrapper.innerHTML = `
            <div class="max-w-[70%]">
                <div class="flex items-center mb-1">
                    <div class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                        <i class="fa fa-robot text-xs"></i>
                    </div>
                    <span class="text-xs text-text-secondary">智能助手</span>
                </div>
                <div class="message-bubble-system p-3">
                    <p class="mb-3 progress-message-text">正在处理文档...</p>
                    <div class="space-y-2 progress-stages">
                        <!-- 动态插入进度条 -->
                    </div>
                </div>
            </div>
        `;
        chatHistory.appendChild(wrapper);
        scrollToBottom();
        return wrapper;
    }

    function updateProgressStage(wrapper, stage, status) {
        const stagesContainer = wrapper.querySelector('.progress-stages');
        const stageLabels = {
            'l0': 'L0 文件存储',
            'l1': 'L1 文档解析',
            'l2': 'L2 向量化',
            'l3': 'L3 知识提取',
            'qa': 'QA 挖掘'
        };

        let stageEl = stagesContainer.querySelector(`[data-stage="${stage}"]`);
        if (!stageEl) {
            stageEl = document.createElement('div');
            stageEl.className = 'flex items-center space-x-2';
            stageEl.setAttribute('data-stage', stage);
            stageEl.innerHTML = `
                <div class="flex-1">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-sm text-text-secondary">${stageLabels[stage]}</span>
                        <span class="stage-status text-xs"></span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="stage-progress bg-primary h-2 rounded-full transition-all duration-500" style="width: 0%"></div>
                    </div>
                </div>
            `;
            stagesContainer.appendChild(stageEl);
        }

        const progressBar = stageEl.querySelector('.stage-progress');
        const statusEl = stageEl.querySelector('.stage-status');

        switch(status) {
            case 'processing':
                progressBar.style.width = '50%';
                statusEl.innerHTML = '<i class="fa fa-spinner fa-spin text-primary"></i>';
                break;
            case 'completed':
                progressBar.style.width = '100%';
                statusEl.innerHTML = '<i class="fa fa-check-circle text-success"></i>';
                break;
            case 'error':
                progressBar.style.width = '100%';
                progressBar.classList.remove('bg-primary');
                progressBar.classList.add('bg-error');
                statusEl.innerHTML = '<i class="fa fa-exclamation-circle text-error"></i>';
                break;
        }
        scrollToBottom();
    }

    function updateProgressMessage(wrapper, text) {
        const messageText = wrapper.querySelector('.progress-message-text');
        if (messageText) {
            messageText.textContent = text;
        }
    }

    // ========== 新功能：带操作按钮的消息 ==========
    function addSystemMessageWithActions(text, actions) {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex fade-in';
        wrapper.innerHTML = `
            <div class="max-w-[70%]">
                <div class="flex items-center mb-1">
                    <div class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                        <i class="fa fa-robot text-xs"></i>
                    </div>
                    <span class="text-xs text-text-secondary">智能助手</span>
                </div>
                <div class="message-bubble-system p-3">
                    <div class="message-text whitespace-pre-line">${text}</div>
                    ${actions && actions.length > 0 ? `
                        <div class="flex space-x-2 mt-3 pt-3 border-t border-gray-200">
                            ${actions.map((action, index) => `
                                <button class="btn-primary text-sm px-3 py-1.5 action-btn" data-index="${index}">
                                    ${action.icon ? `<i class="fa fa-${action.icon} mr-1"></i>` : ''}
                                    ${action.label}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        // 绑定按钮事件
        if (actions && actions.length > 0) {
            actions.forEach((action, index) => {
                const btn = wrapper.querySelector(`[data-index="${index}"]`);
                if (btn) {
                    btn.addEventListener('click', () => {
                        handleActionClick(action.action, action.data || {});
                    });
                }
            });
        }

        chatHistory.appendChild(wrapper);
        scrollToBottom();
        return wrapper;
    }

    // ========== 新功能：处理操作点击 ==========
    function handleActionClick(action, data) {
        switch(action) {
            case 'open_conflict_panel':
                openDetailPanel('conflict', data);
                break;
            case 'open_category_panel':
                openDetailPanel('category', data);
                break;
            case 'open_faq_panel':
                openDetailPanel('faq', data);
                break;
            case 'open_exception_panel':
                openExceptionPanel();
                break;
            case 'keep_existing':
                addSystemMessage('好的，保持原有文件名。');
                break;
            case 'update_filename':
                addSystemMessage('文件名已更新。');
                break;
            case 'cancel':
                addSystemMessage('已取消上传。');
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    // ========== 新功能：面板管理 ==========
    function openDetailPanel(type, data) {
        const titleEl = document.getElementById('detail-title');
        const iconEl = document.getElementById('detail-icon');
        const contentEl = document.getElementById('detail-content');

        // 设置标题和图标
        switch(type) {
            case 'conflict':
                titleEl.textContent = '文档冲突处理';
                iconEl.className = 'fa fa-exclamation-triangle text-warning text-lg';
                contentEl.innerHTML = generateConflictDetail(data);
                break;
            case 'category':
                titleEl.textContent = '分类确认';
                iconEl.className = 'fa fa-folder text-primary text-lg';
                contentEl.innerHTML = generateCategoryDetail(data);
                break;
            case 'faq':
                titleEl.textContent = 'FAQ审核';
                iconEl.className = 'fa fa-question-circle text-primary text-lg';
                contentEl.innerHTML = generateFaqDetail(data);
                break;
        }

        // 显示面板
        detailPanel.classList.remove('translate-x-full');
        detailOverlay.classList.remove('hidden');
    }

    function closeDetailPanel() {
        detailPanel.classList.add('translate-x-full');
        detailOverlay.classList.add('hidden');
    }

    function showExceptionListView() {
        if (exceptionListView) exceptionListView.classList.remove('hidden');
        if (exceptionDetailView) exceptionDetailView.classList.add('hidden');
        if (exceptionPanelBody) exceptionPanelBody.scrollTop = 0;
    }

    function showExceptionDetailView(meta, detailHtml) {
        if (exceptionDetailTitle) exceptionDetailTitle.textContent = meta.title || '异常详情';
        if (exceptionDetailType) exceptionDetailType.textContent = `${getExceptionTypeLabel(meta.type)} · 详情`;
        if (exceptionDetailTime) exceptionDetailTime.textContent = meta.time || '';
        setPriorityBadge(exceptionDetailPriority, meta.priority);

        if (exceptionDetailContent) {
            exceptionDetailContent.innerHTML = detailHtml || '<p class="text-sm text-text-secondary">暂无详细信息</p>';
        }

        if (exceptionListView) exceptionListView.classList.add('hidden');
        if (exceptionDetailView) exceptionDetailView.classList.remove('hidden');
        if (exceptionPanelBody) {
            exceptionPanelBody.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function getExceptionTypeLabel(type) {
        switch(type) {
            case 'conflict':
                return '文档冲突';
            case 'category':
                return '待分类';
            case 'faq':
                return 'FAQ待审';
            default:
                return '异常';
        }
    }

    function setPriorityBadge(el, priority) {
        if (!el) return;
        const priorityMap = {
            high: { text: '高', classes: 'bg-red-100 text-red-800' },
            medium: { text: '中', classes: 'bg-yellow-100 text-yellow-800' },
            low: { text: '低', classes: 'bg-green-100 text-green-800' }
        };
        const current = priorityMap[priority] || priorityMap.medium;
        el.textContent = current.text;
        el.className = `px-2 py-1 rounded-full text-xs ${current.classes}`;
    }

    function openExceptionPanel() {
        initExceptionList();
        showExceptionListView();
        exceptionPanel.classList.remove('translate-x-full');
        exceptionOverlay.classList.remove('hidden');
    }

    function closeExceptionPanel() {
        exceptionPanel.classList.add('translate-x-full');
        exceptionOverlay.classList.add('hidden');
    }

    // 绑定面板关闭事件
    if (detailClose) {
        detailClose.addEventListener('click', closeDetailPanel);
    }
    if (detailOverlay) {
        detailOverlay.addEventListener('click', closeDetailPanel);
    }
    if (exceptionClose) {
        exceptionClose.addEventListener('click', closeExceptionPanel);
    }
    if (exceptionOverlay) {
        exceptionOverlay.addEventListener('click', closeExceptionPanel);
    }
    if (exceptionBackBtn) {
        exceptionBackBtn.addEventListener('click', showExceptionListView);
    }

    // ========== 新功能：面板详情生成 ==========
    function generateConflictDetail(data) {
        const { similarDoc, similarity, differences } = data;
        return `
            <div class="space-y-4">
                <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <p class="text-sm text-yellow-800">
                        <i class="fa fa-info-circle mr-2"></i>
                        检测到与已有文档高度相似，请确认处理方式
                    </p>
                </div>

                <div class="bg-white rounded-lg border border-border-light p-4">
                    <h3 class="text-sm font-semibold text-text-primary mb-3">相似文档信息</h3>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-sm text-text-secondary">文档标题：</span>
                            <span class="text-sm text-text-primary font-medium">${similarDoc.title}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-text-secondary">录入时间：</span>
                            <span class="text-sm text-text-primary">${similarDoc.created_at}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-text-secondary">相似度：</span>
                            <div class="flex items-center">
                                <div class="w-32 bg-gray-200 rounded-full h-2 mr-2">
                                    <div class="bg-warning h-2 rounded-full" style="width: ${similarity}%"></div>
                                </div>
                                <span class="text-sm font-semibold text-warning">${similarity}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                ${differences && differences.length > 0 ? `
                    <div class="bg-white rounded-lg border border-border-light p-4">
                        <h3 class="text-sm font-semibold text-text-primary mb-3">主要差异</h3>
                        <ul class="space-y-2">
                            ${differences.map(diff => `
                                <li class="flex items-start text-sm text-text-primary">
                                    <i class="fa fa-circle text-primary text-xs mr-2 mt-1"></i>
                                    <span>${diff}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}

                <div class="bg-white rounded-lg border border-border-light p-4">
                    <h3 class="text-sm font-semibold text-text-primary mb-3">处理选项</h3>
                    <div class="space-y-2">
                        <button onclick="handleReplaceDocument()" class="w-full flex items-center justify-between px-4 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-all">
                            <div class="flex items-center">
                                <i class="fa fa-refresh mr-3"></i>
                                <span>覆盖为新版本</span>
                            </div>
                            <i class="fa fa-chevron-right"></i>
                        </button>
                        <button onclick="handleKeepBoth()" class="w-full flex items-center justify-between px-4 py-3 bg-white text-text-primary border border-border-light rounded-lg hover:bg-gray-50 transition-all">
                            <div class="flex items-center">
                                <i class="fa fa-copy mr-3"></i>
                                <span>保留两个版本</span>
                            </div>
                            <i class="fa fa-chevron-right"></i>
                        </button>
                        <button onclick="handleIgnore()" class="w-full flex items-center justify-between px-4 py-3 bg-white text-text-secondary border border-border-light rounded-lg hover:bg-gray-50 transition-all">
                            <div class="flex items-center">
                                <i class="fa fa-ban mr-3"></i>
                                <span>忽略</span>
                            </div>
                            <i class="fa fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function generateCategoryDetail(data) {
        const { category, categoryConfidence, tags, summary } = data;
        return `
            <div class="space-y-4">
                <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p class="text-sm text-blue-800">
                        <i class="fa fa-info-circle mr-2"></i>
                        系统自动分类置信度较低，请确认或修改分类
                    </p>
                </div>

                <div class="bg-white rounded-lg border border-border-light p-4">
                    <h3 class="text-sm font-semibold text-text-primary mb-3">系统推荐分类</h3>
                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm text-text-secondary mb-2">公司主体（置信度: ${Math.round(categoryConfidence * 100)}%）</label>
                            <input type="text" class="input-primary" value="${category.company_entity}" id="category-entity">
                        </div>
                        <div>
                            <label class="block text-sm text-text-secondary mb-2">业务领域</label>
                            <select class="input-primary" id="category-domain">
                                <option value="${category.business_domain}" selected>${category.business_domain}</option>
                                <option value="入转调离/入职服务">入转调离/入职服务</option>
                                <option value="员工福利/假期管理">员工福利/假期管理</option>
                                <option value="员工关系/员工服务">员工关系/员工服务</option>
                                <option value="培训发展">培训发展</option>
                                <option value="招聘管理">招聘管理</option>
                            </select>
                        </div>
                    </div>
                </div>

                ${tags && tags.length > 0 ? `
                    <div class="bg-white rounded-lg border border-border-light p-4">
                        <h3 class="text-sm font-semibold text-text-primary mb-3">提取标签</h3>
                        <div class="flex flex-wrap gap-2">
                            ${tags.map(tag => `
                                <span class="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm">
                                    ${tag}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="flex space-x-2">
                    <button onclick="handleSaveCategory()" class="flex-1 btn-primary">
                        <i class="fa fa-check mr-2"></i>保存分类
                    </button>
                    <button onclick="closeDetailPanel()" class="flex-1 btn-secondary">
                        稍后处理
                    </button>
                </div>
            </div>
        `;
    }

    function generateFaqDetail(data) {
        const { needReview, autoApproved } = data;
        if (!needReview || needReview.length === 0) {
            return '<p class="text-center text-text-secondary py-8">暂无需要审核的FAQ</p>';
        }

        const currentFaq = needReview[0];
        return `
            <div class="space-y-4">
                <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p class="text-sm text-blue-800">
                        <i class="fa fa-info-circle mr-2"></i>
                        共 ${needReview.length} 条FAQ需要审核，${autoApproved ? autoApproved.length : 0} 条已自动入库
                    </p>
                </div>

                <div class="bg-white rounded-lg border border-border-light p-4">
                    <h3 class="text-sm font-semibold text-text-primary mb-3">问题</h3>
                    <p class="text-sm text-text-primary">${currentFaq.question || '产假有多少天？'}</p>
                </div>

                <div class="bg-white rounded-lg border border-border-light p-4">
                    <h3 class="text-sm font-semibold text-text-primary mb-3">答案</h3>
                    <div class="bg-gray-50 p-3 rounded text-sm text-text-primary">
                        ${currentFaq.answer || '根据最新政策，产假为158天，包括基本产假98天和延长产假60天。'}
                    </div>
                </div>

                ${currentFaq.similar_qa ? `
                    <div class="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
                        <h3 class="text-sm font-semibold text-yellow-800 mb-3">
                            <i class="fa fa-exclamation-triangle mr-2"></i>发现相似问题
                        </h3>
                        <div class="space-y-2">
                            <div class="text-sm">
                                <span class="text-text-secondary">相似问题：</span>
                                <span class="text-text-primary">${currentFaq.similar_qa.question}</span>
                            </div>
                            <div class="text-sm">
                                <span class="text-text-secondary">已有答案：</span>
                                <span class="text-text-primary">${currentFaq.similar_qa.answer}</span>
                            </div>
                            <div class="text-sm">
                                <span class="text-text-secondary">相似度：</span>
                                <span class="font-semibold text-warning">${currentFaq.similarity ? Math.round(currentFaq.similarity * 100) : 95}%</span>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <div class="flex space-x-2">
                    <button onclick="handleApproveFaq()" class="flex-1 btn-primary">
                        <i class="fa fa-check mr-2"></i>批准发布
                    </button>
                    <button onclick="handleRejectFaq()" class="flex-1 btn-secondary">
                        <i class="fa fa-times mr-2"></i>驳回
                    </button>
                </div>

                ${needReview.length > 1 ? `
                    <div class="text-center text-sm text-text-secondary">
                        1 / ${needReview.length}
                    </div>
                ` : ''}
            </div>
        `;
    }

    // ========== 新功能：处理操作函数 ==========
    window.handleReplaceDocument = function() {
        closeDetailPanel();
        addSystemMessage('已将旧版本归档，新版本已激活！');
    };

    window.handleKeepBoth = function() {
        closeDetailPanel();
        addSystemMessage('已保留两个版本，均可正常检索。');
    };

    window.handleIgnore = function() {
        closeDetailPanel();
        addSystemMessage('已忽略相似检测，文档继续处理。');
    };

    window.handleSaveCategory = function() {
        const entity = document.getElementById('category-entity')?.value;
        const domain = document.getElementById('category-domain')?.value;
        closeDetailPanel();
        addSystemMessage(`分类已确认：${entity} - ${domain}`);
    };

    window.handleApproveFaq = function() {
        closeDetailPanel();
        addSystemMessage('FAQ已批准发布，可用于检索！');
    };

    window.handleRejectFaq = function() {
        closeDetailPanel();
        addSystemMessage('FAQ已驳回。');
    };

    // ========== 新功能：异常列表初始化 ==========
    function initExceptionList() {
        const mockExceptions = [
            { id: 1, title: '2025年产假政策 vs 2024年产假政策', type: 'conflict', time: '2025-12-12 10:30', priority: 'high' },
            { id: 2, title: '员工心理健康咨询服务指南', type: 'category', time: '2025-12-12 10:25', priority: 'medium' },
            { id: 3, title: 'FAQ: 产假有多少天？', type: 'faq', time: '2025-12-12 10:20', priority: 'low' },
            { id: 4, title: '远程办公申请流程文档', type: 'category', time: '2025-12-12 10:15', priority: 'medium' },
            { id: 5, title: '新员工入职指南 vs 入职指南2025', type: 'conflict', time: '2025-12-12 10:10', priority: 'high' },
        ];

        const listEl = document.getElementById('exception-list');
        if (listEl) {
            listEl.innerHTML = mockExceptions.map(ex => `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3">
                        <input type="checkbox" class="w-4 h-4 exception-checkbox" data-exception-id="${ex.id}" data-exception-type="${ex.type}">
                    </td>
                    <td class="px-4 py-3">
                        <div class="flex items-center">
                            <i class="fa fa-${ex.type === 'conflict' ? 'exclamation-triangle text-warning' : ex.type === 'category' ? 'folder text-primary' : 'question-circle text-blue-500'} mr-2"></i>
                            <span class="text-sm text-text-primary">${ex.title}</span>
                        </div>
                    </td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs ${ex.type === 'conflict' ? 'bg-red-100 text-red-800' : ex.type === 'category' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}">
                            ${ex.type === 'conflict' ? '文档冲突' : ex.type === 'category' ? '待分类' : 'FAQ待审'}
                        </span>
                    </td>
                    <td class="px-4 py-3 text-sm text-text-secondary">${ex.time}</td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs ${ex.priority === 'high' ? 'bg-red-100 text-red-800' : ex.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                            ${ex.priority === 'high' ? '高' : ex.priority === 'medium' ? '中' : '低'}
                        </span>
                    </td>
                    <td class="px-4 py-3">
                        <button onclick="handleExceptionDetail('${ex.type}', ${ex.id})" class="text-primary hover:text-secondary text-sm">
                            <i class="fa fa-eye mr-1"></i>查看详情
                        </button>
                    </td>
                </tr>
            `).join('');

            // 绑定批量选择事件
            bindExceptionCheckboxEvents();
        }
    }

    function buildExceptionDetailHtml(type) {
        const data = getMockDataByType(type);
        switch(type) {
            case 'conflict':
                return generateConflictDetail(data);
            case 'category':
                return generateCategoryDetail(data);
            case 'faq':
                return generateFaqDetail(data);
            default:
                return '<p class="text-sm text-text-secondary">暂无详细信息</p>';
        }
    }

    window.handleExceptionDetail = function(type, id) {
        const checkbox = document.querySelector(`.exception-checkbox[data-exception-id="${id}"]`);
        const row = checkbox ? checkbox.closest('tr') : null;
        const title = row?.querySelector('td:nth-child(2) span')?.textContent?.trim() || '异常详情';
        const time = row?.querySelector('td:nth-child(4)')?.textContent?.trim() || '';
        const priorityText = row?.querySelector('td:nth-child(5) span')?.textContent?.trim() || '';
        const priority = priorityText.includes('高') ? 'high' : priorityText.includes('低') ? 'low' : 'medium';

        const detailHtml = buildExceptionDetailHtml(type);
        showExceptionDetailView({ id, type, title, time, priority }, detailHtml);
    };

    function getMockDataByType(type) {
        switch(type) {
            case 'conflict':
                return {
                    similarDoc: { title: '2024年产假政策', created_at: '2024-11-28 10:00:00' },
                    similarity: 92,
                    differences: ['新增体检医院信息', '更新银行卡要求']
                };
            case 'category':
                return {
                    category: { company_entity: '集团总部', business_domain: '员工关系/员工服务' },
                    categoryConfidence: 0.65,
                    tags: ['心理健康', '员工关怀', '咨询服务'],
                    summary: '介绍员工心理健康咨询服务的申请流程'
                };
            case 'faq':
                return {
                    needReview: [{
                        question: '产假有多少天？',
                        answer: '根据最新政策，产假为158天，包括基本产假98天和延长产假60天。',
                        similar_qa: {
                            question: '产假天数是多少？',
                            answer: '根据2024年政策，产假为128天...',
                        },
                        similarity: 0.95
                    }],
                    autoApproved: []
                };
        }
    }

    // ========== 新功能：绑定快捷指令点击事件（增强原有的）==========
    // 异常处理指令（第7个，如果存在的话）已在上方统一处理，此处不再重复绑定
    // 注释掉以避免覆盖原有的输入框填充功能
    /*
    if (commandCards.length >= 7) {
        commandCards[6].addEventListener('click', () => {
            openExceptionPanel();
        });
    }
    */

    // ========== handleEnhancedFileUpload已经在前面定义，这里删除重复定义 ==========
    // 以下为测试函数
    // ========== 新功能：示例对话触发函数（用于测试）==========
    window.showDocumentUploadDemo = async function() {
        const mockFile = { name: '2025年产假政策.pdf' };
        await handleEnhancedFileUpload([mockFile]);
    };

    window.showSimilarDocDemo = async function() {
        addSystemMessageWithActions(`检测到相似内容！

相似文档：《2024年产假政策》
相似度：92%

主要差异：
• 新增体检医院信息
• 更新银行卡要求`, [
            { label: '处理', icon: 'cog', action: 'open_conflict_panel', data: {
                similarDoc: { title: '2024年产假政策', created_at: '2024-11-28 10:00:00' },
                similarity: 92,
                differences: ['新增体检医院信息', '更新银行卡要求']
            }}
        ]);
    };

    window.showCategoryDemo = async function() {
        addSystemMessageWithActions(`文档上传成功！但我不太确定这份文档的分类：

我的猜测（不确定）：
• 公司主体：集团总部（置信度65%）
• 业务领域：员工关系/员工服务

能帮我确认一下吗？`, [
            { label: '确认分类', icon: 'folder', action: 'open_category_panel', data: {
                category: { company_entity: '集团总部', business_domain: '员工关系/员工服务' },
                categoryConfidence: 0.65,
                tags: ['心理健康', '员工关怀', '咨询服务'],
                summary: '介绍员工心理健康咨询服务的申请流程'
            }}
        ]);
    };

    window.showFaqDemo = async function() {
        addSystemMessageWithActions(`从文档中挖掘出 15 条FAQ：
• 自动入库：12 条（高置信度）
• 需要审核：3 条（低置信度或与已有FAQ相似）`, [
            { label: '审核FAQ', icon: 'question-circle', action: 'open_faq_panel', data: {
                needReview: [{
                    question: '产假有多少天？',
                    answer: '根据最新政策，产假为158天，包括基本产假98天和延长产假60天。',
                    similar_qa: {
                        question: '产假天数是多少？',
                        answer: '根据2024年政策，产假为128天...'
                    },
                    similarity: 0.95
                }],
                autoApproved: []
            }}
        ]);
    };

    window.showExceptionPanelDemo = function() {
        openExceptionPanel();
    };

    // ========== 批量选择状态管理 ==========
    const batchSelectionState = {
        selectedIds: new Set(),
        lockedType: null,

        reset() {
            this.selectedIds.clear();
            this.lockedType = null;
        },

        add(id, type) {
            if (this.lockedType === null) {
                this.lockedType = type;
            }
            if (type === this.lockedType) {
                this.selectedIds.add(id);
                return true;
            }
            return false;
        },

        remove(id) {
            this.selectedIds.delete(id);
            if (this.selectedIds.size === 0) {
                this.lockedType = null;
            }
        },

        getCount() {
            return this.selectedIds.size;
        },

        getTypeLabel() {
            switch(this.lockedType) {
                case 'conflict':
                    return '文档冲突';
                case 'category':
                    return '待分类';
                case 'faq':
                    return 'FAQ待审';
                default:
                    return '';
            }
        }
    };

    // 绑定复选框事件
    function bindExceptionCheckboxEvents() {
        const checkboxes = document.querySelectorAll('.exception-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const exceptionId = this.getAttribute('data-exception-id');
                const exceptionType = this.getAttribute('data-exception-type');

                if (this.checked) {
                    const success = batchSelectionState.add(exceptionId, exceptionType);
                    if (!success) {
                        this.checked = false;
                        alert('只能批量处理相同类型的异常');
                        return;
                    }
                } else {
                    batchSelectionState.remove(exceptionId);
                }

                updateExceptionSelection();
            });
        });

        // 绑定全选按钮
        const selectAllBtn = document.getElementById('exception-select-all');
        if (selectAllBtn) {
            selectAllBtn.replaceWith(selectAllBtn.cloneNode(true)); // 移除旧事件
            document.getElementById('exception-select-all').addEventListener('change', function() {
                const availableCheckboxes = document.querySelectorAll('.exception-checkbox:not(:disabled)');
                availableCheckboxes.forEach(checkbox => {
                    checkbox.checked = this.checked;
                    const exceptionId = checkbox.getAttribute('data-exception-id');
                    const exceptionType = checkbox.getAttribute('data-exception-type');

                    if (this.checked) {
                        batchSelectionState.add(exceptionId, exceptionType);
                    } else {
                        batchSelectionState.remove(exceptionId);
                    }
                });

                updateExceptionSelection();
            });
        }

        // 绑定批量处理按钮
        const batchHandleBtn = document.getElementById('exception-batch-handle');
        if (batchHandleBtn) {
            batchHandleBtn.replaceWith(batchHandleBtn.cloneNode(true));
            document.getElementById('exception-batch-handle').addEventListener('click', handleExceptionBatchProcess);
        }

        // 绑定批量忽略按钮
        const batchIgnoreBtn = document.getElementById('exception-batch-ignore');
        if (batchIgnoreBtn) {
            batchIgnoreBtn.replaceWith(batchIgnoreBtn.cloneNode(true));
            document.getElementById('exception-batch-ignore').addEventListener('click', handleExceptionBatchIgnore);
        }
    }

    function updateExceptionSelection() {
        const count = batchSelectionState.getCount();
        const typeLabel = batchSelectionState.getTypeLabel();

        // 更新计数器
        const countEl = document.getElementById('exception-selected-count');
        if (countEl) {
            if (typeLabel) {
                countEl.parentElement.innerHTML = `已选择 <span id="exception-selected-count">${count}</span> 项 (<span class="text-primary">${typeLabel}</span>)`;
            } else {
                countEl.textContent = count;
            }
        }

        // 更新按钮状态
        const batchHandleBtn = document.getElementById('exception-batch-handle');
        const batchIgnoreBtn = document.getElementById('exception-batch-ignore');
        if (batchHandleBtn) batchHandleBtn.disabled = count === 0;
        if (batchIgnoreBtn) batchIgnoreBtn.disabled = count === 0;

        // 更新复选框禁用状态
        if (batchSelectionState.lockedType) {
            document.querySelectorAll('.exception-checkbox').forEach(cb => {
                const cbType = cb.getAttribute('data-exception-type');
                const row = cb.closest('tr');
                if (cbType !== batchSelectionState.lockedType && !cb.checked) {
                    cb.disabled = true;
                    if (row) row.style.opacity = '0.5';
                    cb.title = '只能批量处理相同类型的异常';
                }
            });
        } else {
            document.querySelectorAll('.exception-checkbox').forEach(cb => {
                cb.disabled = false;
                const row = cb.closest('tr');
                if (row) row.style.opacity = '1';
                cb.title = '';
            });
        }

        // 更新全选按钮
        const selectAllCheckbox = document.getElementById('exception-select-all');
        if (selectAllCheckbox) {
            const allCheckboxes = Array.from(document.querySelectorAll('.exception-checkbox:not(:disabled)'));
            const checkedCheckboxes = allCheckboxes.filter(cb => cb.checked);
            selectAllCheckbox.checked = allCheckboxes.length > 0 && allCheckboxes.length === checkedCheckboxes.length;
        }
    }

    // 获取已选异常的数据
    function getSelectedExceptionsData() {
        const selectedIds = Array.from(batchSelectionState.selectedIds);
        const exceptions = [];

        selectedIds.forEach(id => {
            const checkbox = document.querySelector(`.exception-checkbox[data-exception-id="${id}"]`);
            if (checkbox) {
                const row = checkbox.closest('tr');
                const titleEl = row.querySelector('td:nth-child(2) span');
                const title = titleEl ? titleEl.textContent : '';
                exceptions.push({
                    id: id,
                    type: batchSelectionState.lockedType,
                    title: title
                });
            }
        });

        return exceptions;
    }

    // 批量处理主逻辑
    function handleExceptionBatchProcess() {
        const selectedIds = Array.from(batchSelectionState.selectedIds);
        if (selectedIds.length === 0) {
            alert('请先选择要处理的异常');
            return;
        }

        const exceptionType = batchSelectionState.lockedType;
        const exceptions = getSelectedExceptionsData();

        switch(exceptionType) {
            case 'conflict':
                showConflictBatchDialog(exceptions);
                break;
            case 'category':
                showCategoryBatchDialog(exceptions);
                break;
            case 'faq':
                showFaqBatchDialog(exceptions);
                break;
            default:
                alert('未知的异常类型');
        }
    }

    // 批量忽略
    function handleExceptionBatchIgnore() {
        const count = batchSelectionState.getCount();
        const typeLabel = batchSelectionState.getTypeLabel();

        if (confirm(`确认忽略这 ${count} 个${typeLabel}异常吗？\n\n忽略后这些异常将不再显示。`)) {
            const selectedIds = Array.from(batchSelectionState.selectedIds);
            selectedIds.forEach(id => {
                const checkbox = document.querySelector(`.exception-checkbox[data-exception-id="${id}"]`);
                if (checkbox) {
                    const row = checkbox.closest('tr');
                    row.style.transition = 'opacity 0.3s';
                    row.style.opacity = '0';
                    setTimeout(() => row.remove(), 300);
                }
            });

            addSystemMessage(`已忽略 ${count} 个${typeLabel}异常`);
            batchSelectionState.reset();
            updateExceptionSelection();
        }
    }

    // 批量处理对话框管理
    function showBatchDialog(title, content, onConfirm) {
        const dialog = document.getElementById('batch-dialog');
        const overlay = document.getElementById('batch-dialog-overlay');
        const titleEl = document.getElementById('batch-dialog-title');
        const contentEl = document.getElementById('batch-dialog-content');
        const confirmBtn = document.getElementById('batch-dialog-confirm');
        const cancelBtn = document.getElementById('batch-dialog-cancel');

        titleEl.textContent = title;
        contentEl.innerHTML = content;

        dialog.classList.remove('hidden');
        overlay.classList.remove('hidden');

        const closeDialog = () => {
            dialog.classList.add('hidden');
            overlay.classList.add('hidden');
        };

        // 移除旧事件监听器
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        const newCancelBtn = cancelBtn.cloneNode(true);
        cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

        document.getElementById('batch-dialog-confirm').addEventListener('click', () => {
            onConfirm();
            closeDialog();
        });

        document.getElementById('batch-dialog-cancel').addEventListener('click', closeDialog);
        overlay.addEventListener('click', closeDialog, { once: true });
    }

    // 文档冲突批量处理对话框
    function showConflictBatchDialog(exceptions) {
        const count = exceptions.length;
        const content = `
            <div class="space-y-4">
                <p class="text-sm text-text-secondary">已选择 ${count} 个文档冲突，请选择批量处理方式：</p>

                <div class="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                    <ul class="text-sm text-text-secondary space-y-1">
                        ${exceptions.map(ex => `<li>• ${ex.title}</li>`).join('')}
                    </ul>
                </div>

                <div class="space-y-2">
                    <label class="flex items-center p-3 border border-border-light rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="conflict-action" value="replace" class="mr-3" checked>
                        <div>
                            <div class="font-medium text-text-primary">批量覆盖为新版本</div>
                            <div class="text-xs text-text-secondary">所有新文档将覆盖旧版本</div>
                        </div>
                    </label>

                    <label class="flex items-center p-3 border border-border-light rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="conflict-action" value="keep_both" class="mr-3">
                        <div>
                            <div class="font-medium text-text-primary">批量保留两个版本</div>
                            <div class="text-xs text-text-secondary">为新文档自动添加版本号后缀</div>
                        </div>
                    </label>
                </div>
            </div>
        `;

        showBatchDialog('批量处理文档冲突', content, () => {
            const selectedAction = document.querySelector('input[name="conflict-action"]:checked')?.value;
            if (selectedAction) {
                executeBatchConflictAction(selectedAction, exceptions);
            }
        });
    }

    function executeBatchConflictAction(action, exceptions) {
        const count = exceptions.length;
        const actionLabels = {
            'replace': '覆盖为新版本',
            'keep_both': '保留两个版本'
        };

        addSystemMessage(`正在批量处理 ${count} 个文档冲突...`);

        setTimeout(() => {
            exceptions.forEach(ex => {
                const checkbox = document.querySelector(`.exception-checkbox[data-exception-id="${ex.id}"]`);
                if (checkbox) {
                    const row = checkbox.closest('tr');
                    row.style.transition = 'opacity 0.3s';
                    row.style.opacity = '0';
                    setTimeout(() => row.remove(), 300);
                }
            });

            addSystemMessage(`批量处理成功：已${actionLabels[action]} ${count} 个文档`);
            batchSelectionState.reset();
            updateExceptionSelection();
        }, 1000);
    }

    // 待分类批量处理对话框
    function showCategoryBatchDialog(exceptions) {
        const count = exceptions.length;
        const content = `
            <div class="space-y-4">
                <p class="text-sm text-text-secondary">已选择 ${count} 个待分类项目，请选择统一的分类：</p>

                <div>
                    <label class="block text-sm font-medium text-text-secondary mb-2">公司主体</label>
                    <select id="batch-company-entity" class="input-primary">
                        <option value="集团总部">集团总部</option>
                        <option value="分公司A">分公司A</option>
                        <option value="分公司B">分公司B</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-text-secondary mb-2">业务领域</label>
                    <select id="batch-business-domain" class="input-primary">
                        <option value="入转调离/入职服务">入转调离/入职服务</option>
                        <option value="员工福利/假期管理">员工福利/假期管理</option>
                        <option value="员工关系/员工服务">员工关系/员工服务</option>
                        <option value="培训发展">培训发展</option>
                        <option value="招聘管理">招聘管理</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-text-secondary mb-2">标签(可选)</label>
                    <input type="text" id="batch-tags" class="input-primary" placeholder="多个标签用逗号分隔">
                </div>

                <div class="bg-blue-50 p-3 rounded-lg">
                    <p class="text-xs text-blue-800">
                        <i class="fa fa-info-circle mr-1"></i>
                        该分类将应用到所有选中的文档
                    </p>
                </div>
            </div>
        `;

        showBatchDialog('批量分类', content, () => {
            const companyEntity = document.getElementById('batch-company-entity')?.value;
            const businessDomain = document.getElementById('batch-business-domain')?.value;
            const tags = document.getElementById('batch-tags')?.value;

            const categoryData = {
                company_entity: companyEntity,
                business_domain: businessDomain,
                tags: tags ? tags.split(',').map(t => t.trim()) : []
            };

            executeBatchCategoryAction(categoryData, exceptions);
        });
    }

    function executeBatchCategoryAction(categoryData, exceptions) {
        const count = exceptions.length;

        addSystemMessage(`正在为 ${count} 个文档应用分类...`);

        setTimeout(() => {
            exceptions.forEach(ex => {
                const checkbox = document.querySelector(`.exception-checkbox[data-exception-id="${ex.id}"]`);
                if (checkbox) {
                    const row = checkbox.closest('tr');
                    row.style.transition = 'opacity 0.3s';
                    row.style.opacity = '0';
                    setTimeout(() => row.remove(), 300);
                }
            });

            addSystemMessage(`批量分类成功：已为 ${count} 个文档应用分类\n公司主体: ${categoryData.company_entity}\n业务领域: ${categoryData.business_domain}`);
            batchSelectionState.reset();
            updateExceptionSelection();
        }, 1000);
    }

    // FAQ批量处理对话框
    function showFaqBatchDialog(exceptions) {
        const count = exceptions.length;
        const content = `
            <div class="space-y-4">
                <p class="text-sm text-text-secondary">已选择 ${count} 条FAQ待审，请选择批量操作：</p>

                <div class="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                    <ul class="text-sm text-text-secondary space-y-1">
                        ${exceptions.map(ex => `<li>• ${ex.title}</li>`).join('')}
                    </ul>
                </div>

                <div class="space-y-2">
                    <label class="flex items-center p-3 border border-border-light rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="faq-action" value="approve" class="mr-3" checked>
                        <div>
                            <div class="font-medium text-text-primary">批量批准发布</div>
                            <div class="text-xs text-text-secondary">所有FAQ将发布到知识库</div>
                        </div>
                    </label>

                    <label class="flex items-center p-3 border border-border-light rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="faq-action" value="reject" class="mr-3">
                        <div>
                            <div class="font-medium text-text-primary">批量驳回</div>
                            <div class="text-xs text-text-secondary">需要填写驳回原因</div>
                        </div>
                    </label>

                    <label class="flex items-center p-3 border border-border-light rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="faq-action" value="delay" class="mr-3">
                        <div>
                            <div class="font-medium text-text-primary">批量延期审核</div>
                            <div class="text-xs text-text-secondary">稍后再处理</div>
                        </div>
                    </label>
                </div>

                <div id="reject-reason-container" class="hidden">
                    <label class="block text-sm font-medium text-text-secondary mb-2">驳回原因</label>
                    <textarea id="batch-reject-reason" class="input-primary" rows="3" placeholder="请输入驳回原因..."></textarea>
                </div>
            </div>
        `;

        showBatchDialog('批量处理FAQ', content, () => {
            const selectedAction = document.querySelector('input[name="faq-action"]:checked')?.value;
            const rejectReason = document.getElementById('batch-reject-reason')?.value;

            if (selectedAction === 'reject' && !rejectReason) {
                alert('请输入驳回原因');
                return;
            }

            executeBatchFaqAction(selectedAction, exceptions, rejectReason);
        });

        // 监听单选按钮变化
        setTimeout(() => {
            const radioButtons = document.querySelectorAll('input[name="faq-action"]');
            const reasonContainer = document.getElementById('reject-reason-container');

            radioButtons.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.value === 'reject') {
                        reasonContainer.classList.remove('hidden');
                    } else {
                        reasonContainer.classList.add('hidden');
                    }
                });
            });
        }, 100);
    }

    function executeBatchFaqAction(action, exceptions, reason = '') {
        const count = exceptions.length;
        const actionLabels = {
            'approve': '批准发布',
            'reject': '驳回',
            'delay': '延期审核'
        };

        addSystemMessage(`正在批量${actionLabels[action]} ${count} 条FAQ...`);

        setTimeout(() => {
            exceptions.forEach(ex => {
                const checkbox = document.querySelector(`.exception-checkbox[data-exception-id="${ex.id}"]`);
                if (checkbox) {
                    const row = checkbox.closest('tr');
                    row.style.transition = 'opacity 0.3s';
                    row.style.opacity = '0';
                    setTimeout(() => row.remove(), 300);
                }
            });

            let message = `批量处理成功：已${actionLabels[action]} ${count} 条FAQ`;
            if (action === 'reject' && reason) {
                message += `\n驳回原因: ${reason}`;
            }

            addSystemMessage(message);
            batchSelectionState.reset();
            updateExceptionSelection();
        }, 1000);
    }

    // ========== 知识管理面板JavaScript ==========

    // 模拟知识体系数据存储 (支持多层级嵌套结构)
    let knowledgeCategories = JSON.parse(JSON.stringify(knowledgeCategoriesSeed));

    // 知识树状态（多层级支持）
    let expandedNodes = new Set();
    let activeKnowledgeNodeId = 'all';

    // 统计分类总数（含多级）
    function countCategories(categories = []) {
        return categories.reduce((acc, cat) => acc + 1 + countCategories(cat.children || []), 0);
    }

    // 查找分类节点并返回路径
    function findCategoryNode(categories, targetId, path = []) {
        for (const cat of categories) {
            if (cat.id === targetId) {
                return { node: cat, path };
            }
            if (cat.children && cat.children.length > 0) {
                const found = findCategoryNode(cat.children, targetId, [...path, cat.id]);
                if (found) return found;
            }
        }
        return null;
    }

    // 收集节点及其所有子节点ID
    function collectCategoryIds(category, bucket = []) {
        bucket.push(category.id);
        (category.children || []).forEach(child => collectCategoryIds(child, bucket));
        return bucket;
    }

    // 确保选中节点的祖先展开，方便定位多级节点
    function ensureAncestorsExpanded(nodeId) {
        const result = findCategoryNode(knowledgeCategories, nodeId);
        if (result) {
            result.path.forEach(pid => expandedNodes.add(pid));
        }
    }

    // 根节点元信息，便于在UI中呈现定义与分类标准
    const rootNodeMeta = {
        id: 'all',
        name: '全部知识',
        definition: 'HRSSC知识全景，覆盖战略与制度、组织岗位、招聘入职、在职运营、薪酬福利、绩效发展、离职交接与知识运营八大域。',
        classification: '顶层按主题域分层；中层按业务流程与能力拆解；底层按作业场景与资源类型（政策/流程/模板/FAQ/案例/工具）区分，保证MECE、可扩展、可演进。'
    };

    // 获取节点路径名称（用于面包屑与元信息展示）
    function getNodePathNames(nodeId, fallbackName = '') {
        if (nodeId === 'all') return ['全部知识'];
        const found = findCategoryNode(knowledgeCategories, nodeId);
        if (!found) return ['全部知识', fallbackName || nodeId];

        const names = ['全部知识'];
        found.path.forEach(pid => {
            const parentNode = findCategoryNode(knowledgeCategories, pid);
            if (parentNode?.node?.name) {
                names.push(parentNode.node.name);
            }
        });
        names.push(found.node.name);
        return names;
    }

    // 聚合节点元信息：定义、分类标准、路径与子节点统计
    function getNodeMeta(nodeId, fallbackName = '') {
        if (nodeId === 'all') {
            return {
                ...rootNodeMeta,
                path: ['全部知识'],
                children: knowledgeCategories.length,
                descendants: countCategories(knowledgeCategories)
            };
        }

        const found = findCategoryNode(knowledgeCategories, nodeId);
        if (!found) return null;

        const node = found.node;
        return {
            id: node.id,
            name: node.name || fallbackName,
            definition: node.definition || '待补充定义',
            classification: node.classification || '分类标准待补充',
            path: getNodePathNames(nodeId, fallbackName),
            children: node.children ? node.children.length : 0,
            descendants: countCategories(node.children || [])
        };
    }

    // 在右侧面板展示节点元信息，帮助用户理解分类意义
    function renderNodeMeta(nodeId, nodeName = '') {
        const panel = document.getElementById('node-meta-panel');
        if (!panel) return;

        const meta = getNodeMeta(nodeId, nodeName);
        if (!meta) {
            panel.classList.add('hidden');
            return;
        }

        panel.classList.remove('hidden');
        const pathText = meta.path ? meta.path.join(' / ') : (nodeName || '全部知识');
        panel.innerHTML = `
            <div class="bg-white shadow-card rounded-lg p-4 border border-gray-100 col-span-2">
                <div class="flex items-center justify-between mb-2">
                    <div class="text-xs font-semibold text-teal-600 uppercase tracking-wide">节点定义</div>
                    <div class="text-[11px] text-gray-500">ID: ${meta.id}</div>
                </div>
                <p class="text-sm text-text-primary leading-relaxed">${meta.definition}</p>
            </div>
            <div class="bg-white shadow-card rounded-lg p-4 border border-gray-100">
                <div class="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">分类标准</div>
                <p class="text-sm text-text-primary leading-relaxed">${meta.classification}</p>
                <div class="flex items-center text-xs text-gray-500 mt-3 space-x-3">
                    <span>直接子类: ${meta.children || 0}</span>
                    <span>含下级: ${meta.descendants || 0}</span>
                </div>
            </div>
            <div class="bg-white shadow-card rounded-lg p-4 border border-gray-100">
                <div class="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">导航路径</div>
                <p class="text-sm text-text-primary leading-relaxed">${pathText}</p>
            </div>
        `;
    }

    // 模拟FAQ数据存储
    let faqData = [...faqSeed];

    // 知识体系增删改查功能
    window.addCategory = function() {
        const categoryName = prompt('请输入新分类名称：');
        if (!categoryName || !categoryName.trim()) return;

        const newId = 'category-' + Date.now();
        const newCategory = {
            id: newId,
            name: categoryName.trim(),
            icon: 'folder',
            color: 'blue',
            children: []
        };
        knowledgeCategories.push(newCategory);
        expandedNodes.add(newId);

        // 选中新分类，便于继续维护
        selectKnowledgeTreeNode(newId, newCategory.name);
        alert(`分类"${categoryName}"添加成功！`);
    };

    // 添加子分类功能
    window.addChildCategory = function(parentId) {
        const categoryName = prompt('请输入子分类名称：');
        if (!categoryName || !categoryName.trim()) return;

        const newCategory = {
            id: 'category-' + Date.now(),
            name: categoryName.trim(),
            icon: 'folder',
            color: 'blue',
            children: []
        };

        // 递归查找父节点并添加子节点
        function addToParent(categories) {
            for (let cat of categories) {
                if (cat.id === parentId) {
                    cat.children.push(newCategory);
                    return true;
                }
                if (cat.children && cat.children.length > 0) {
                    if (addToParent(cat.children)) return true;
                }
            }
            return false;
        }

        if (addToParent(knowledgeCategories)) {
            expandedNodes.add(parentId);
            selectKnowledgeTreeNode(newCategory.id, newCategory.name);
            alert(`子分类"${categoryName}"添加成功！`);
        }
    };

    window.editCategory = function(categoryId, currentName) {
        const newName = prompt('请输入新的分类名称：', currentName);
        if (!newName || !newName.trim() || newName === currentName) return;

        // 递归查找并更新分类
        function findAndUpdate(categories) {
            for (let cat of categories) {
                if (cat.id === categoryId) {
                    cat.name = newName.trim();
                    return true;
                }
                if (cat.children && cat.children.length > 0) {
                    if (findAndUpdate(cat.children)) return true;
                }
            }
            return false;
        }

        if (findAndUpdate(knowledgeCategories)) {
            selectKnowledgeTreeNode(categoryId, newName.trim());
            alert(`分类名称已更新为"${newName}"`);
        }
    };

    window.deleteCategory = function(categoryId, categoryName) {
        if (!confirm(`确定要删除分类"${categoryName}"及其所有子分类吗？\n此操作不可恢复。`)) return;

        // 递归删除节点
        let removedIds = [];
        function removeFromTree(categories) {
            for (let i = 0; i < categories.length; i++) {
                const cat = categories[i];
                if (cat.id === categoryId) {
                    removedIds = collectCategoryIds(cat, []);
                    categories.splice(i, 1);
                    return true;
                }
                if (cat.children && cat.children.length > 0) {
                    if (removeFromTree(cat.children)) return true;
                }
            }
            return false;
        }

        if (removeFromTree(knowledgeCategories)) {
            removedIds.forEach(id => expandedNodes.delete(id));

            const removedActive = removedIds.includes(activeKnowledgeNodeId);
            const fallbackId = removedActive ? 'all' : activeKnowledgeNodeId;
            const fallbackName = fallbackId === 'all'
                ? '全部知识'
                : (findCategoryNode(knowledgeCategories, fallbackId)?.node?.name || '全部知识');

            selectKnowledgeTreeNode(fallbackId, fallbackName);
            alert(`分类"${categoryName}"及其子分类已删除`);
        }
    };

    // 渲染知识体系树 (递归实现支持多层级)
    function renderKnowledgeTree() {
        const treeContainer = document.getElementById('knowledge-tree-nodes');
        if (!treeContainer) return;

        const totalCategories = countCategories(knowledgeCategories);
        let html = `
            <div class="tree-node" data-node-id="all">
                <div class="tree-node-item px-3 py-2 rounded cursor-pointer hover:bg-gray-100 ${activeKnowledgeNodeId === 'all' ? 'active' : ''}" onclick="window.selectKnowledgeTreeNode && selectKnowledgeTreeNode('all', '全部知识')">
                    <i class="fa fa-home text-teal-600 mr-2"></i>
                    <span class="text-sm font-medium">全部知识</span>
                    <span class="ml-auto text-xs text-gray-500">${totalCategories}</span>
                </div>
            </div>
        `;

        html += renderCategoryNode(knowledgeCategories, 0);
        treeContainer.innerHTML = html;
    }

    // 递归渲染分类节点
    function renderCategoryNode(categories, level) {
        let html = '';
        const indent = level * 16; // 每层缩进16px

        categories.forEach(category => {
            const hasChildren = category.children && category.children.length > 0;
            const isExpanded = expandedNodes.has(category.id);
            const isActive = category.id === activeKnowledgeNodeId;
            const descendantCount = countCategories(category.children || []);

            html += `
                <div class="tree-node" data-node-id="${category.id}" style="padding-left: ${indent}px">
                    <div class="tree-node-item px-3 py-2 rounded cursor-pointer hover:bg-gray-100 flex items-center group ${isActive ? 'active' : ''}">
                        ${hasChildren ? `
                            <i class="fa fa-caret-right tree-toggle mr-1 text-gray-500 ${isExpanded ? 'expanded' : ''}"
                               onclick="toggleKnowledgeTreeNode('${category.id}'); event.stopPropagation();"></i>
                        ` : `<span class="w-3 mr-1"></span>`}
                        <i class="fa fa-${category.icon} text-${category.color}-500 mr-2"></i>
                        <span class="text-sm flex-1"
                              onclick="selectKnowledgeTreeNode('${category.id}', '${category.name}')">${category.name}</span>
                        <span class="text-xs text-gray-500 mr-2">${descendantCount}</span>

                        <!-- 操作按钮 -->
                        <div class="hidden group-hover:flex space-x-1">
                            <button class="text-green-500 hover:text-green-700 text-xs"
                                    onclick="addChildCategory('${category.id}'); event.stopPropagation();"
                                    title="添加子分类">
                                <i class="fa fa-plus"></i>
                            </button>
                            <button class="text-blue-500 hover:text-blue-700 text-xs"
                                    onclick="editCategory('${category.id}', '${category.name}'); event.stopPropagation();"
                                    title="编辑">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button class="text-red-500 hover:text-red-700 text-xs"
                                    onclick="deleteCategory('${category.id}', '${category.name}'); event.stopPropagation();"
                                    title="删除">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>

                    ${hasChildren ? `
                        <div class="tree-children ${isExpanded ? '' : 'hidden'}">
                            ${renderCategoryNode(category.children, level + 1)}
                        </div>
                    ` : ''}
                </div>
            `;
        });

        return html;
    }

    // 默认展开一级分类
    knowledgeCategories.forEach(cat => expandedNodes.add(cat.id));
    renderKnowledgeTree();
    renderNodeMeta('all', '全部知识');
    updateKnowledgeContent('all', '全部知识');

    // 添加分类按钮事件
    const addCategoryBtn = document.getElementById('add-category-btn');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', () => {
            addCategory();
        });
    }

    // FAQ增删改查功能
    function loadFaqList() {
        const faqList = document.getElementById('faq-list');
        if (!faqList) return;

        if (faqData.length === 0) {
            faqList.innerHTML = `
                <div class="text-center text-text-secondary py-8">
                    <i class="fa fa-question-circle-o text-4xl mb-3"></i>
                    <p>暂无FAQ，点击右上角添加</p>
                </div>
            `;
            return;
        }

        const html = faqData.map(faq => {
            const statusColor = faq.status === 'published' ? 'green' : 'yellow';
            const statusText = faq.status === 'published' ? '已发布' : '草稿';
            const relatedDocsText = faq.relatedDocs.length > 0 ? faq.relatedDocs.join(', ') : '--';

            return `
                <div class="bg-white rounded-lg shadow-card p-4 card-hover">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <i class="fa fa-question-circle text-teal-600 mr-2"></i>
                                <h4 class="font-semibold text-text-primary">${faq.question}</h4>
                                <span class="ml-2 px-2 py-0.5 bg-${statusColor}-100 text-${statusColor}-800 text-xs rounded-full">${statusText}</span>
                            </div>
                            <p class="text-sm text-text-secondary pl-6">${faq.answer}</p>
                        </div>
                    </div>
                    <div class="pl-6 border-t pt-3 mt-3">
                        <div class="flex items-center justify-between text-xs text-text-secondary">
                            <div class="space-y-1">
                                <div><i class="fa fa-link mr-1"></i>关联文档: ${relatedDocsText}</div>
                                <div><i class="fa fa-clock-o mr-1"></i>创建时间: ${faq.createdAt}</div>
                            </div>
                            <div class="space-x-2">
                                <button class="text-primary hover:text-secondary" onclick="window.viewFaq && viewFaq('${faq.id}')"><i class="fa fa-eye"></i> 查看</button>
                                <button class="text-blue-500 hover:text-blue-700" onclick="window.editFaq && editFaq('${faq.id}')"><i class="fa fa-edit"></i> 编辑</button>
                                <button class="text-red-500 hover:text-red-700" onclick="window.deleteFaq && deleteFaq('${faq.id}', '${faq.question}')"><i class="fa fa-trash"></i> 删除</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        faqList.innerHTML = html;
    }

    window.addFaq = function() {
        const question = prompt('请输入FAQ问题：');
        if (!question || !question.trim()) return;

        const answer = prompt('请输入FAQ答案：');
        if (!answer || !answer.trim()) return;

        const newFaq = {
            id: 'faq-' + Date.now(),
            question: question.trim(),
            answer: answer.trim(),
            relatedDocs: [],
            status: 'draft',
            createdAt: new Date().toISOString().split('T')[0]
        };

        faqData.push(newFaq);
        loadFaqList();
        alert('FAQ添加成功！');
    };

    window.editFaq = function(faqId) {
        const faq = faqData.find(f => f.id === faqId);
        if (!faq) return;

        const newQuestion = prompt('请输入新的问题：', faq.question);
        if (!newQuestion || !newQuestion.trim()) return;

        const newAnswer = prompt('请输入新的答案：', faq.answer);
        if (!newAnswer || !newAnswer.trim()) return;

        faq.question = newQuestion.trim();
        faq.answer = newAnswer.trim();
        loadFaqList();
        alert('FAQ更新成功！');
    };

    window.deleteFaq = function(faqId, question) {
        if (!confirm(`确定要删除FAQ"${question}"吗？\n此操作不可恢复。`)) return;

        faqData = faqData.filter(f => f.id !== faqId);
        loadFaqList();
        alert('FAQ已删除');
    };

    window.viewFaq = function(faqId) {
        const faq = faqData.find(f => f.id === faqId);
        if (!faq) return;

        const relatedDocsText = faq.relatedDocs.length > 0 ? faq.relatedDocs.join(', ') : '无';
        alert(`FAQ详情\n\n问题：${faq.question}\n\n答案：${faq.answer}\n\n关联文档：${relatedDocsText}\n\n状态：${faq.status === 'published' ? '已发布' : '草稿'}\n\n创建时间：${faq.createdAt}`);
    };

    // 添加FAQ按钮事件
    const addFaqBtn = document.getElementById('add-faq-btn');
    if (addFaqBtn) {
        addFaqBtn.addEventListener('click', () => {
            addFaq();
        });
    }

    // ========== 文档上传弹窗管理 ==========
    let modalSelectedFiles = [];

    // 打开文档上传弹窗
    function openDocumentModal() {
        const modal = document.getElementById('add-document-modal');
        const categorySelect = document.getElementById('doc-category-select');

        // 动态生成分类选项
        categorySelect.innerHTML = '<option value="">请选择...</option>';
        function addCategoryOptions(categories, prefix = '') {
            categories.forEach(cat => {
                categorySelect.innerHTML += `<option value="${cat.id}">${prefix}${cat.name}</option>`;
                if (cat.children && cat.children.length > 0) {
                    addCategoryOptions(cat.children, prefix + '　');
                }
            });
        }
        addCategoryOptions(knowledgeCategories);

        modal.classList.remove('hidden');
    }

    // 关闭弹窗
    function closeDocumentModal() {
        document.getElementById('add-document-modal').classList.add('hidden');
        // 清空表单
        document.getElementById('modal-file-list').innerHTML = '';
        modalSelectedFiles = [];
        document.getElementById('process-summary').checked = true;
        document.getElementById('process-tags').checked = true;
        document.getElementById('process-faq').checked = false;
        document.getElementById('faq-generalization-options').classList.add('hidden');
        document.getElementById('enable-faq-generalization').checked = false;
        document.getElementById('faq-gen-count-setting').classList.add('hidden');
    }

    // 绑定弹窗按钮事件
    document.getElementById('close-document-modal')?.addEventListener('click', closeDocumentModal);
    document.getElementById('cancel-document-btn')?.addEventListener('click', closeDocumentModal);

    // 文件拖拽上传
    const dropZone = document.getElementById('file-drop-zone');
    const modalFileInput = document.getElementById('modal-file-input');

    dropZone?.addEventListener('click', () => modalFileInput?.click());

    dropZone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-teal-500', 'bg-teal-50');
    });

    dropZone?.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-teal-500', 'bg-teal-50');
    });

    dropZone?.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-teal-500', 'bg-teal-50');
        handleModalFiles(e.dataTransfer.files);
    });

    modalFileInput?.addEventListener('change', (e) => {
        handleModalFiles(e.target.files);
    });

    function handleModalFiles(files) {
        Array.from(files).forEach(file => {
            if (!modalSelectedFiles.find(f => f.name === file.name)) {
                modalSelectedFiles.push(file);
            }
        });
        renderModalFileList();
    }

    function renderModalFileList() {
        const fileList = document.getElementById('modal-file-list');
        if (modalSelectedFiles.length === 0) {
            fileList.innerHTML = '';
            return;
        }

        fileList.innerHTML = modalSelectedFiles.map((file, index) => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div class="flex items-center flex-1">
                    <i class="fa fa-file-o text-blue-500 mr-3"></i>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-text-primary">${file.name}</p>
                        <p class="text-xs text-text-secondary">${(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                </div>
                <button onclick="removeModalFile(${index})" class="text-red-500 hover:text-red-700">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    window.removeModalFile = function(index) {
        modalSelectedFiles.splice(index, 1);
        renderModalFileList();
    };

    // FAQ泛化选项联动
    document.getElementById('process-faq')?.addEventListener('change', function() {
        const faqOptions = document.getElementById('faq-generalization-options');
        if (this.checked) {
            faqOptions.classList.remove('hidden');
        } else {
            faqOptions.classList.add('hidden');
            document.getElementById('enable-faq-generalization').checked = false;
            document.getElementById('faq-gen-count-setting').classList.add('hidden');
        }
    });

    // FAQ泛化复选框变化
    document.getElementById('enable-faq-generalization')?.addEventListener('change', function() {
        const countSetting = document.getElementById('faq-gen-count-setting');
        if (this.checked) {
            countSetting.classList.remove('hidden');
        } else {
            countSetting.classList.add('hidden');
        }
    });

    // 滑块值更新
    const faqSlider = document.getElementById('faq-gen-count-slider');
    const faqValueDisplay = document.getElementById('faq-gen-count-value');
    const faqTextDisplay = document.getElementById('faq-gen-count-text');

    faqSlider?.addEventListener('input', function() {
        faqValueDisplay.textContent = this.value;
        faqTextDisplay.textContent = this.value;
    });

    // 表单提交
    document.getElementById('confirm-document-btn')?.addEventListener('click', function() {
        const category = document.getElementById('doc-category-select').value;
        const processSummary = document.getElementById('process-summary').checked;
        const processTags = document.getElementById('process-tags').checked;
        const processFaq = document.getElementById('process-faq').checked;
        const enableFaqGen = document.getElementById('enable-faq-generalization').checked;
        const faqGenCount = document.getElementById('faq-gen-count-slider').value;

        // 验证
        if (!category) {
            alert('请选择知识分类');
            return;
        }
        if (modalSelectedFiles.length === 0) {
            alert('请至少上传一个文件');
            return;
        }

        // 构建配置对象
        const config = {
            category,
            files: modalSelectedFiles,
            processing: {
                summary: processSummary,
                tags: processTags,
                faq: processFaq,
                faqGeneralization: processFaq && enableFaqGen ? {
                    enabled: true,
                    count: parseInt(faqGenCount)
                } : { enabled: false }
            }
        };

        console.log('文档上传配置：', config);
        alert(`已提交 ${modalSelectedFiles.length} 个文件进行处理\n\n配置信息：\n- 分类：${category}\n- 摘要生成：${processSummary ? '是' : '否'}\n- 标签映射：${processTags ? '是' : '否'}\n- FAQ挖掘：${processFaq ? '是' : '否'}${enableFaqGen ? `\n- FAQ泛化数量：${faqGenCount}个` : ''}`);

        closeDocumentModal();
        // TODO: 实际API调用
    });

    // 文档增删改查功能
    window.addDocument = function() {
        openDocumentModal();
    };

    window.viewDocument = function(docId) {
        alert('查看文档功能待实现\nDocument ID: ' + docId);
    };

    window.editDocument = function(docId) {
        alert('编辑文档功能待实现\nDocument ID: ' + docId);
    };

    window.deleteDocument = function(docId, title) {
        if (!confirm(`确定要删除文档"${title}"吗？\n此操作不可恢复。`)) return;
        alert('文档删除功能待实现');
    };

    // 添加文档按钮事件
    const addDocumentBtn = document.getElementById('add-document-btn');
    if (addDocumentBtn) {
        addDocumentBtn.addEventListener('click', () => {
            addDocument();
        });
    }

    // 树节点展开/折叠功能
    window.toggleKnowledgeTreeNode = function(nodeId) {
        if (expandedNodes.has(nodeId)) {
            expandedNodes.delete(nodeId);
        } else {
            expandedNodes.add(nodeId);
        }
        renderKnowledgeTree();
    };

    // 树节点选中功能
    window.selectKnowledgeTreeNode = function(nodeId, nodeName) {
        activeKnowledgeNodeId = nodeId;
        if (nodeId !== 'all') {
            ensureAncestorsExpanded(nodeId);
        }
        renderKnowledgeTree();

        // 更新面包屑
        const breadcrumbText = document.getElementById('breadcrumb-text');
        if (breadcrumbText) {
            const pathNames = getNodePathNames(nodeId, nodeName);
            breadcrumbText.textContent = pathNames.join(' / ');
        }

        renderNodeMeta(nodeId, nodeName);

        // 更新右侧内容（这里可以扩展为实际的数据加载）
        updateKnowledgeContent(nodeId, nodeName);
    };

    // 更新知识内容
    function updateKnowledgeContent(nodeId, nodeName) {
        const documentsList = document.getElementById('documents-list');
        const faqList = document.getElementById('faq-list');

        // 模拟文档数据
        const mockDocuments = {
            'all': [
                { id: 'doc-policy', title: 'HR政策手册 V1.0', desc: '战略与制度分类模型、角色职责与发布口径', date: '2025-12-01', status: 'active' },
                { id: 'doc-onboarding', title: '入职准备清单（标准版）', desc: '入职前材料、设备/账号开通与首日迎新指引', date: '2025-11-15', status: 'active' },
                { id: 'doc-payroll', title: '月度薪资核算SOP', desc: '薪资校验点、发薪SLA、个税与社保申报检查', date: '2025-11-30', status: 'active' },
                { id: 'doc-knowledge', title: '知识运营治理指引', desc: '分类治理、责任人矩阵与版本变更流程', date: '2025-12-05', status: 'active' },
            ],
            'talent-onboarding': [
                { id: 'doc-onboarding', title: '入职准备清单（标准版）', desc: '入职材料、设备与账号开通、报到节奏', date: '2025-11-15', status: 'active' },
                { id: 'doc-probation', title: '试用期目标与转正模板', desc: '试用期OKR模板、辅导节奏与预警提示', date: '2025-12-02', status: 'active' },
            ],
            'operation-attendance': [
                { id: 'doc-leave', title: '假期与加班调休政策', desc: '假期口径、额度、审批链与加班调休规则', date: '2025-12-03', status: 'active' },
                { id: 'doc-attendance', title: '考勤异常处理SOP', desc: '漏打卡、异常工时的举证材料与纠错流程', date: '2025-11-25', status: 'active' },
            ],
            'reward-payroll': [
                { id: 'doc-payroll', title: '月度薪资核算SOP', desc: '核算输入、三道校验、发薪与复核', date: '2025-11-30', status: 'active' },
                { id: 'doc-tax', title: '个税与社保申报操作手册', desc: '申报周期、基数口径与异常处理节点', date: '2025-12-04', status: 'active' },
            ],
            'performance-management': [
                { id: 'doc-performance', title: '绩效周期方案 2025H1', desc: '目标对齐时间表、评估与校准会操作步骤', date: '2025-12-06', status: 'active' },
            ],
            'offboarding-process': [
                { id: 'doc-offboarding', title: '离职办理作业标准', desc: '主动/被动离职审批、补偿口径与留痕清单', date: '2025-12-01', status: 'active' },
            ],
            'knowledge-governance': [
                { id: 'doc-taxonomy', title: '知识分类模型 V1.0', desc: '节点命名规范、版本演进与变更审批流', date: '2025-12-05', status: 'active' },
            ],
            'policy-compliance': [
                { id: 'doc-compliance', title: '劳动合规检查清单', desc: '区域差异、标准合同要素与审计证据点', date: '2025-12-02', status: 'active' },
            ]
        };

        const docs = mockDocuments[nodeId] || [];

        if (docs.length > 0) {
            documentsList.innerHTML = docs.map(doc => `
                <div class="bg-white rounded-lg shadow-card p-4 card-hover">
                    <div class="flex items-start justify-between mb-2">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                                <i class="fa fa-file-text text-blue-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-text-primary">${doc.title}</h4>
                                <p class="text-xs text-text-secondary mt-1">${doc.desc}</p>
                            </div>
                        </div>
                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">活跃</span>
                    </div>
                    <div class="flex items-center justify-between text-xs text-text-secondary mt-3 pt-3 border-t">
                        <span><i class="fa fa-clock-o mr-1"></i>${doc.date}</span>
                        <div class="space-x-2">
                            <button class="text-primary hover:text-secondary" onclick="window.viewDocument && viewDocument('${doc.id}')"><i class="fa fa-eye"></i> 查看</button>
                            <button class="text-blue-500 hover:text-blue-700" onclick="window.editDocument && editDocument('${doc.id}')"><i class="fa fa-edit"></i> 编辑</button>
                            <button class="text-red-500 hover:text-red-700" onclick="window.deleteDocument && deleteDocument('${doc.id}', '${doc.title}')"><i class="fa fa-trash"></i> 删除</button>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            documentsList.innerHTML = `
                <div class="text-center text-text-secondary py-8">
                    <i class="fa fa-folder-open-o text-4xl mb-3"></i>
                    <p>该分类下暂无文档</p>
                </div>
            `;
        }
    }

    // 可拖动分隔条功能
    const knowledgeDivider = document.getElementById('knowledge-divider');
    const knowledgeTreeSide = document.getElementById('knowledge-tree-side');

    if (knowledgeDivider && knowledgeTreeSide) {
        let isResizing = false;
        let startX = 0;
        let startWidth = 0;

        knowledgeDivider.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startWidth = knowledgeTreeSide.offsetWidth;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;

            const delta = e.clientX - startX;
            let newWidth = startWidth + delta;

            // 限制宽度范围 200px - 600px
            newWidth = Math.max(200, Math.min(600, newWidth));

            knowledgeTreeSide.style.width = `${newWidth}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                document.body.style.cursor = '';
                document.body.style.userSelect = '';

                // 保存宽度到localStorage
                const width = knowledgeTreeSide.offsetWidth;
                localStorage.setItem('knowledge-tree-width', width);
            }
        });

        // 双击重置宽度
        knowledgeDivider.addEventListener('dblclick', () => {
            knowledgeTreeSide.style.width = '256px';
            localStorage.setItem('knowledge-tree-width', '256');
        });

        // 从localStorage恢复宽度
        const savedWidth = localStorage.getItem('knowledge-tree-width');
        if (savedWidth) {
            knowledgeTreeSide.style.width = `${savedWidth}px`;
        }
    }

    // 标签页切换功能（已有的逻辑保持不变）
    // ...

    // ========== 完成！==========
    console.log('%c✅ 知识管理对话式交互系统已加载完成', 'color: #10b981; font-size: 14px; font-weight: bold;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #6b7280;');
    console.log('%c🎯 可用的测试函数:', 'color: #1677FF; font-weight: bold;');
    console.log('   - showDocumentUploadDemo() : 模拟文档上传流程');
    console.log('   - showSimilarDocDemo() : 显示相似文档处理');
    console.log('   - showCategoryDemo() : 显示分类确认');
    console.log('   - showFaqDemo() : 显示FAQ审核');
    console.log('   - showExceptionPanelDemo() : 打开异常管理面板');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #6b7280;');
    console.log('%c💡 提示: 如果功能不正常，请按 Cmd+Shift+R (Mac) 或 Ctrl+Shift+R (Win) 强制刷新', 'color: #f59e0b;');
});
