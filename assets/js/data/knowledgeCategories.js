export const knowledgeCategoriesSeed = [
    {
        id: 'policy',
        name: '战略与制度',
        icon: 'folder',
        color: 'teal',
        definition: 'HR治理、制度与风险的顶层规则，确保跨地域、跨业务的一致性与合规性。',
        classification: '按治理主题拆分：政策治理、合规风险、数据安全。',
        children: [
            {
                id: 'policy-governance',
                name: 'HR政策与治理',
                icon: 'folder',
                color: 'teal',
                definition: '定义HR政策框架、角色职责及发布节奏。',
                classification: '政策总则、职责权限、版本发布。',
                children: [
                    { id: 'policy-handbook', name: '政策总则与术语', icon: 'file-text-o', color: 'blue', definition: 'HR政策手册、术语释义与适用范围。', classification: '总则/适用范围/术语' },
                    { id: 'policy-roles', name: '职责与权限矩阵', icon: 'file-text-o', color: 'blue', definition: 'HR、业务、外包方在流程中的责任划分。', classification: '职责分工/授权/升级路径' },
                    { id: 'policy-version', name: '版本管理与公告', icon: 'file-text-o', color: 'blue', definition: '政策版本、发布日期及变更记录。', classification: '版本号/发布渠道/生效与废止' }
                ]
            },
            {
                id: 'policy-compliance',
                name: '合规与风险',
                icon: 'folder',
                color: 'yellow',
                definition: '确保用工合法、审计可追溯、纠纷可控。',
                classification: '法律合规、审计整改、外部监管要求。',
                children: [
                    { id: 'policy-labor', name: '劳动法规与合同模板', icon: 'file-text-o', color: 'yellow', definition: '劳动法适用、区域差异、标准合同与附件。', classification: '法规口径/模板/区域差异' },
                    { id: 'policy-audit', name: '合规稽核与整改', icon: 'file-text-o', color: 'yellow', definition: '内外部审计检查项、整改闭环与证据。', classification: '检查项/缺陷跟踪/复核' },
                    { id: 'policy-dispute', name: '纠纷与仲裁预案', icon: 'file-text-o', color: 'yellow', definition: '劳动争议应对、谈判话术与材料清单。', classification: '争议类型/材料/风险判定' }
                ]
            },
            {
                id: 'policy-security',
                name: '数据安全与隐私',
                icon: 'folder',
                color: 'gray',
                definition: '员工数据采集、存储、共享与留存的安全规范。',
                classification: '数据采集、存储访问、脱敏与留存周期。',
                children: [
                    { id: 'policy-privacy', name: '个人信息与同意', icon: 'file-text-o', color: 'gray', definition: '员工隐私告知、同意书及撤回机制。', classification: '告知/同意/撤回' },
                    { id: 'policy-access', name: '访问与最小权限', icon: 'file-text-o', color: 'gray', definition: '访问分级、审批、日志与异常监控。', classification: '分级/审批/监控' },
                    { id: 'policy-retention', name: '留存与销毁', icon: 'file-text-o', color: 'gray', definition: '数据留存期限、存档标准与销毁流程。', classification: '留存期限/归档/销毁' }
                ]
            }
        ]
    },
    {
        id: 'org',
        name: '组织与岗位',
        icon: 'folder',
        color: 'blue',
        definition: '组织设计、编制与岗位体系，支撑业务结构与人岗匹配。',
        classification: '按组织规划、岗位体系、流程权限划分。',
        children: [
            {
                id: 'org-planning',
                name: '组织与编制',
                icon: 'folder',
                color: 'blue',
                definition: '组织架构、HC计划与预算对齐。',
                classification: '编制计划、预算核定、变更治理。',
                children: [
                    { id: 'org-headcount', name: '年度编制与HC计划', icon: 'file-text-o', color: 'blue', definition: '年度HC拆解、补位策略与冻结规则。', classification: '计划/补位/冻结' },
                    { id: 'org-structure', name: '组织架构与变更', icon: 'file-text-o', color: 'blue', definition: '架构设计、汇报关系与变更审批链路。', classification: '设计原则/变更审批/沟通' },
                    { id: 'org-budget', name: '预算与成本分摊', icon: 'file-text-o', color: 'blue', definition: '人力成本口径、分摊规则与追踪。', classification: '成本口径/分摊/追踪' }
                ]
            },
            {
                id: 'org-job',
                name: '岗位与职级',
                icon: 'folder',
                color: 'indigo',
                definition: '岗位说明书、职级体系与任职资格定义。',
                classification: '岗位标准、职级与晋升、资质与评审。',
                children: [
                    { id: 'org-jd', name: '岗位说明书', icon: 'file-text-o', color: 'indigo', definition: '岗位职责、任职要求与关键指标。', classification: '职责/能力/指标' },
                    { id: 'org-level', name: '职级体系与晋升', icon: 'file-text-o', color: 'indigo', definition: '职级梯队、晋升节奏、评审标准。', classification: '职级映射/晋升周期/评审口径' },
                    { id: 'org-qualification', name: '任职资格与认证', icon: 'file-text-o', color: 'indigo', definition: '专业资格、技能认证与复评。', classification: '资格定义/取证/复评' }
                ]
            },
            {
                id: 'org-workflow',
                name: '流程与权限',
                icon: 'folder',
                color: 'cyan',
                definition: 'HR主数据、审批流与系统权限管理。',
                classification: '流程分级、权限模型、主数据口径。',
                children: [
                    { id: 'org-approval', name: '审批链路与SLA', icon: 'file-text-o', color: 'cyan', definition: '跨部门审批节点、SLA与升级规则。', classification: '节点/时效/升级' },
                    { id: 'org-masterdata', name: '主数据口径', icon: 'file-text-o', color: 'cyan', definition: '人事字段定义、编码规则与变更留痕。', classification: '字段/编码/留痕' }
                ]
            }
        ]
    },
    {
        id: 'talent',
        name: '招聘与入职',
        icon: 'folder',
        color: 'green',
        definition: '面向人才获取与转化的全链路标准化。',
        classification: '按策略渠道、流程执行、入职承接分层。',
        children: [
            {
                id: 'talent-strategy',
                name: '招聘策略与渠道',
                icon: 'folder',
                color: 'green',
                definition: '需求拆解、预算与渠道组合。',
                classification: '需求计划、渠道与供应商、雇主品牌。',
                children: [
                    { id: 'talent-plan', name: '招聘需求与预算', icon: 'file-text-o', color: 'green', definition: 'HC需求、优先级与预算控制。', classification: '需求拆解/优先级/预算' },
                    { id: 'talent-channel', name: '渠道与供应商', icon: 'file-text-o', color: 'green', definition: '直招、外包、猎头与绩效评估。', classification: '渠道组合/供方管理/评估' },
                    { id: 'talent-brand', name: '雇主品牌与校招', icon: 'file-text-o', color: 'green', definition: '雇主品牌资产、校招项目与宣讲物料。', classification: '品牌素材/校招流程/触点' }
                ]
            },
            {
                id: 'talent-execution',
                name: '招聘流程',
                icon: 'folder',
                color: 'emerald',
                definition: '从JD发布到offer签署的作业标准。',
                classification: 'JD与渠道、评估、offer与背调。',
                children: [
                    { id: 'talent-jd-release', name: 'JD发布与管理', icon: 'file-text-o', color: 'emerald', definition: 'JD模板、发布规范与更新节奏。', classification: '模板/发布/更新' },
                    { id: 'talent-interview', name: '面试评估与评分卡', icon: 'file-text-o', color: 'emerald', definition: '面试流程、题库与评分标准。', classification: '流程/题库/评分卡' },
                    { id: 'talent-offer', name: 'offer审批与发放', icon: 'file-text-o', color: 'emerald', definition: '薪酬对标、审批链、offer发放与保存。', classification: '对标/审批/留存' },
                    { id: 'talent-background', name: '背景调查与体检', icon: 'file-text-o', color: 'emerald', definition: '背调分级、供应商SLA、体检项目与豁免。', classification: '分级/SLA/豁免' }
                ]
            },
            {
                id: 'talent-onboarding',
                name: '入职管理',
                icon: 'folder',
                color: 'lime',
                definition: 'offer转化后的入职体验与合规闭环。',
                classification: '入职前准备、首日报到、试用期管理。',
                children: [
                    { id: 'onboarding-prep', name: '入职准备', icon: 'file-text-o', color: 'lime', definition: '资料收集、工位/设备准备、账户申请。', classification: '材料/设备/账户' },
                    { id: 'onboarding-day1', name: '报到与首日体验', icon: 'file-text-o', color: 'lime', definition: '报到指引、迎新、合规签署与培训。', classification: '报到/签署/迎新' },
                    { id: 'onboarding-probation', name: '试用期管理', icon: 'file-text-o', color: 'lime', definition: '试用期目标、转正评估与风险预警。', classification: '目标/评估/预警' }
                ]
            }
        ]
    },
    {
        id: 'operation',
        name: '在职运营与员工关系',
        icon: 'folder',
        color: 'orange',
        definition: '围绕在职员工的人事合同、考勤假勤与关系维护。',
        classification: '合同与变更、考勤假期、员工关系与沟通。',
        children: [
            {
                id: 'operation-contract',
                name: '劳动合同与人事变更',
                icon: 'folder',
                color: 'orange',
                definition: '合同签订续签、调岗调薪调级与派遣管理。',
                classification: '合同/变更/派遣外包。',
                children: [
                    { id: 'operation-contracting', name: '签订/续签/变更', icon: 'file-text-o', color: 'orange', definition: '合同模板、续签提醒与变更审批。', classification: '模板/提醒/审批' },
                    { id: 'operation-transfer', name: '调岗调薪调级', icon: 'file-text-o', color: 'orange', definition: '调动类型、审批口径与生效规则。', classification: '类型/口径/生效' },
                    { id: 'operation-secondment', name: '派遣与外包', icon: 'file-text-o', color: 'orange', definition: '派遣/外包用工管理与合规要求。', classification: '用工类型/合同/监管' }
                ]
            },
            {
                id: 'operation-attendance',
                name: '考勤与假期',
                icon: 'folder',
                color: 'amber',
                definition: '假勤政策、排班规则与异常处理。',
                classification: '假期口径、加班与调休、异常纠偏。',
                children: [
                    { id: 'operation-leave', name: '假期政策与申请', icon: 'file-text-o', color: 'amber', definition: '假期类型、额度、申请与审批流。', classification: '类型/额度/流程' },
                    { id: 'operation-overtime', name: '加班与调休', icon: 'file-text-o', color: 'amber', definition: '加班申请、调休抵扣与工资结算。', classification: '申请/抵扣/结算' },
                    { id: 'operation-attendance-exception', name: '考勤异常处理', icon: 'file-text-o', color: 'amber', definition: '漏打卡、异常工时与纠错流程。', classification: '异常分类/证明/纠错' }
                ]
            },
            {
                id: 'operation-relationship',
                name: '员工关系与沟通',
                icon: 'folder',
                color: 'red',
                definition: '员工沟通、关怀计划与纪律处分机制。',
                classification: '沟通与关怀、申诉与仲裁、纪律处分。',
                children: [
                    { id: 'operation-engagement', name: '沟通与关怀', icon: 'file-text-o', color: 'red', definition: '员工关怀、活动与情绪预警。', classification: '关怀/活动/预警' },
                    { id: 'operation-grievance', name: '申诉与投诉处理', icon: 'file-text-o', color: 'red', definition: '申诉入口、调查流程与输出。', classification: '入口/调查/结论' },
                    { id: 'operation-discipline', name: '纪律处分与争议', icon: 'file-text-o', color: 'red', definition: '违规判定、处分级别与法律风险。', classification: '判定/级别/风险' }
                ]
            }
        ]
    },
    {
        id: 'reward',
        name: '薪酬福利与激励',
        icon: 'folder',
        color: 'purple',
        definition: '薪酬、福利、长期激励的设计与落地。',
        classification: '薪酬核算、福利保障、激励机制。',
        children: [
            {
                id: 'reward-payroll',
                name: '薪酬发放与核算',
                icon: 'folder',
                color: 'purple',
                definition: '薪酬结构、薪资核算、个税与社保。',
                classification: '结构口径、核算发放、税社保申报。',
                children: [
                    { id: 'reward-structure', name: '薪酬结构与带宽', icon: 'file-text-o', color: 'purple', definition: '薪级薪档、市场对标与带宽控制。', classification: '档级/对标/带宽' },
                    { id: 'reward-payrun', name: '薪资核算与发放', icon: 'file-text-o', color: 'purple', definition: '薪资周期、校验点与发薪SLA。', classification: '周期/校验/SLA' },
                    { id: 'reward-tax', name: '个税与社保申报', icon: 'file-text-o', color: 'purple', definition: '申报流程、基数口径与异常处理。', classification: '申报/基数/异常' }
                ]
            },
            {
                id: 'reward-benefit',
                name: '福利与保障',
                icon: 'folder',
                color: 'pink',
                definition: '社保公积金、商业保险、假期与补贴。',
                classification: '强制福利、自选福利、假期补贴。',
                children: [
                    { id: 'reward-social', name: '社保与公积金', icon: 'file-text-o', color: 'pink', definition: '参保规则、基数、转移与补缴。', classification: '参保/基数/转移补缴' },
                    { id: 'reward-insurance', name: '商业保险', icon: 'file-text-o', color: 'pink', definition: '投保方案、理赔流程与供应商管理。', classification: '方案/理赔/供方' },
                    { id: 'reward-leave', name: '带薪假期与补贴', icon: 'file-text-o', color: 'pink', definition: '年假、病假、福利补贴与适用条件。', classification: '假期口径/补贴/适用' }
                ]
            },
            {
                id: 'reward-incentive',
                name: '激励机制',
                icon: 'folder',
                color: 'violet',
                definition: '短期奖金与长期激励的设计与执行。',
                classification: '奖金分配、股权/长期激励、认可计划。',
                children: [
                    { id: 'reward-bonus', name: '奖金激励与分配', icon: 'file-text-o', color: 'violet', definition: '奖金池测算、分配口径与发放节奏。', classification: '测算/口径/节奏' },
                    { id: 'reward-equity', name: '长期激励/股权', icon: 'file-text-o', color: 'violet', definition: '股权计划、归属条件与税务处理。', classification: '计划/归属/税务' },
                    { id: 'reward-recognition', name: '认可与非金激励', icon: 'file-text-o', color: 'violet', definition: '即时认可、荣誉体系与预算管理。', classification: '形式/预算/频次' }
                ]
            }
        ]
    },
    {
        id: 'performance',
        name: '绩效与发展',
        icon: 'folder',
        color: 'cyan',
        definition: '绩效闭环与员工发展路径的能力建设。',
        classification: '绩效管理、培训学习、职业发展。',
        children: [
            {
                id: 'performance-management',
                name: '绩效管理',
                icon: 'folder',
                color: 'cyan',
                definition: '目标制定、评估校准、反馈改进。',
                classification: '目标对齐、评估校准、反馈辅导。',
                children: [
                    { id: 'performance-goal', name: '目标制定与对齐', icon: 'file-text-o', color: 'cyan', definition: 'OKR/KPI口径、拆解方法与对齐节奏。', classification: '口径/拆解/节奏' },
                    { id: 'performance-review', name: '周期评估与校准', icon: 'file-text-o', color: 'cyan', definition: '评估周期、校准会与争议处理。', classification: '周期/校准/争议' },
                    { id: 'performance-feedback', name: '反馈与改进', icon: 'file-text-o', color: 'cyan', definition: '绩效面谈、辅导计划与改进跟踪。', classification: '面谈/辅导/跟踪' }
                ]
            },
            {
                id: 'performance-learning',
                name: '培训与学习',
                icon: 'folder',
                color: 'sky',
                definition: '学习体系、资源与效果评估。',
                classification: '体系与课程、学习资源、效果评估。',
                children: [
                    { id: 'learning-system', name: '培训体系与课程库', icon: 'file-text-o', color: 'sky', definition: '能力模型、课程地图与人群分层。', classification: '模型/地图/分层' },
                    { id: 'learning-delivery', name: '学习资源与工具', icon: 'file-text-o', color: 'sky', definition: '线上线下资源、平台与学习路径。', classification: '资源/平台/路径' },
                    { id: 'learning-evaluation', name: '培训效果评估', icon: 'file-text-o', color: 'sky', definition: '满意度、学以致用与业务指标验证。', classification: '满意度/应用/指标' }
                ]
            },
            {
                id: 'performance-career',
                name: '职业发展与继任',
                icon: 'folder',
        color: 'sky',
                definition: '职业双通道、继任计划与内部流动。',
                classification: '职业路径、继任盘点、流动与轮岗。',
                children: [
                    { id: 'career-path', name: '职业路径与双通道', icon: 'file-text-o', color: 'sky', definition: '专业/管理双通道与成长里程碑。', classification: '通道/里程碑/标准' },
                    { id: 'career-succession', name: '继任计划与盘点', icon: 'file-text-o', color: 'sky', definition: '关键岗位继任梯队、风险与行动计划。', classification: '关键岗位/梯队/行动' },
                    { id: 'career-mobility', name: '内部流动与轮岗', icon: 'file-text-o', color: 'sky', definition: '内推、内部招聘、轮岗与体验营。', classification: '渠道/规则/体验' }
                ]
            }
        ]
    },
    {
        id: 'offboarding',
        name: '离职与交接',
        icon: 'folder',
        color: 'stone',
        definition: '离职流程、补偿风险与知识资产交接。',
        classification: '离职办理、交接回收、离职后管理。',
        children: [
            {
                id: 'offboarding-process',
                name: '离职办理',
                icon: 'folder',
                color: 'stone',
                definition: '主动与被动离职的作业标准与合规审查。',
                classification: '离职类型、审批与风控、补偿口径。',
                children: [
                    { id: 'offboarding-voluntary', name: '主动离职流程', icon: 'file-text-o', color: 'stone', definition: '申请、面谈、交接与离职证明。', classification: '申请/面谈/证明' },
                    { id: 'offboarding-involuntary', name: '解聘/裁员流程', icon: 'file-text-o', color: 'stone', definition: '解聘情形、风险评估与法律必备材料。', classification: '情形/评估/材料' },
                    { id: 'offboarding-compensation', name: '补偿与风险控制', icon: 'file-text-o', color: 'stone', definition: '补偿计算、谈判要点与合规留痕。', classification: '计算/谈判/留痕' }
                ]
            },
            {
                id: 'offboarding-handover',
                name: '交接与资产回收',
                icon: 'folder',
                color: 'amber',
                definition: '知识、客户、设备与权限的闭环回收。',
                classification: '知识交接、资产回收、权限关闭。',
                children: [
                    { id: 'offboarding-knowledge', name: '知识与客户交接', icon: 'file-text-o', color: 'amber', definition: '工作移交清单、客户/项目交接与文档沉淀。', classification: '清单/客户项目/沉淀' },
                    { id: 'offboarding-assets', name: '设备资产回收', icon: 'file-text-o', color: 'amber', definition: '设备回收、工牌/钥匙与库存登记。', classification: '设备/物理资产/登记' },
                    { id: 'offboarding-access', name: '权限关闭与保留', icon: 'file-text-o', color: 'amber', definition: '系统权限、邮箱与数据保留口径。', classification: '权限/邮箱/留存' }
                ]
            },
            {
                id: 'offboarding-post',
                name: '离职后管理',
                icon: 'folder',
                color: 'orange',
                definition: '离职洞察、校友网络与返聘机制。',
                classification: '离职访谈、数据分析、校友与返聘。',
                children: [
                    { id: 'offboarding-exit-interview', name: '离职访谈与洞察', icon: 'file-text-o', color: 'orange', definition: '离职访谈题纲、根因分析与改进行动。', classification: '访谈/根因/改进' },
                    { id: 'offboarding-alumni', name: '校友网络与返聘', icon: 'file-text-o', color: 'orange', definition: '校友社群、返聘流程与品牌维护。', classification: '社群/返聘/品牌' }
                ]
            }
        ]
    },
    {
        id: 'knowledgeops',
        name: '知识运营与工具',
        icon: 'folder',
        color: 'teal',
        definition: '支撑知识库持续演进的分类标准、质量与工具。',
        classification: '治理、质量、工具与数据三个维度。',
        children: [
            {
                id: 'knowledge-governance',
                name: '分类标准与治理',
                icon: 'folder',
                color: 'teal',
                definition: '分类模型、版本与角色治理。',
                classification: '分类模型、角色责任、变更管理。',
                children: [
                    { id: 'knowledge-model', name: '分类模型与版本', icon: 'file-text-o', color: 'teal', definition: '分类原则、节点命名、版本变更记录。', classification: '原则/命名/版本' },
                    { id: 'knowledge-role', name: '责任人矩阵', icon: 'file-text-o', color: 'teal', definition: '维护人、审核人、发布人及SLA。', classification: '角色/职责/SLA' },
                    { id: 'knowledge-change', name: '变更与审计', icon: 'file-text-o', color: 'teal', definition: '节点新增/删除/移动的审批与审计日志。', classification: '新增删除移动/审批/审计' }
                ]
            },
            {
                id: 'knowledge-quality',
                name: '知识质量',
                icon: 'folder',
                color: 'emerald',
                definition: '评审、有效期、敏感信息治理。',
                classification: '评审与发布、有效期与归档、敏感信息。',
                children: [
                    { id: 'knowledge-review', name: '评审与发布规则', icon: 'file-text-o', color: 'emerald', definition: '评审清单、发布准入与纠错通道。', classification: '清单/准入/纠错' },
                    { id: 'knowledge-archive', name: '有效期与归档', icon: 'file-text-o', color: 'emerald', definition: '过期提醒、更新节奏与归档策略。', classification: '提醒/更新/归档' },
                    { id: 'knowledge-sensitive', name: '敏感信息与脱敏', icon: 'file-text-o', color: 'emerald', definition: '敏感字段、脱敏规则与水印留痕。', classification: '字段/脱敏/留痕' }
                ]
            },
            {
                id: 'knowledge-tooling',
                name: '工具与数据',
                icon: 'folder',
                color: 'blue',
                definition: '知识生产与检索工具、标签体系与数据监控。',
                classification: 'FAQ与检索、标签元数据、数据看板。',
                children: [
                    { id: 'knowledge-faq', name: 'FAQ体系与检索', icon: 'file-text-o', color: 'blue', definition: 'FAQ分层、泛化策略与检索规则。', classification: '分层/泛化/检索' },
                    { id: 'knowledge-tag', name: '标签与元数据', icon: 'file-text-o', color: 'blue', definition: '标签规范、自动打标与关联关系。', classification: '规范/自动化/关联' },
                    { id: 'knowledge-dashboard', name: '数据看板与监控', icon: 'file-text-o', color: 'blue', definition: '利用率、缺口、反馈与改进闭环。', classification: '利用率/缺口/反馈' }
                ]
            }
        ]
    }
];
