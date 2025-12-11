"use client";
import React, { FC, useState, useEffect } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import { Minus, Plus, Settings, Play, StopCircle, Users, Clock, Hash, Trash2, Sliders, Award, MessageSquare, Edit3, Save, RotateCcw, Monitor, Zap } from 'lucide-react'; 

// --- MOCK DATA ---
const mockSessions = [
    { id: "S101", game: "Empathy Builder", class: "5th Grade A", students: 28, started: "10:00 AM", status: "Active" },
    { id: "S102", game: "Bystander Challenge", class: "6th Grade C", students: 15, started: "10:15 AM", status: "Running" },
];

const ToggleSwitch: FC<{ isEnabled: boolean; setIsEnabled: (enabled: boolean) => void; label: string }> = ({ isEnabled, setIsEnabled, label }) => {
    return (
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-inner">
            <span className="text-gray-800 font-medium">{label}</span>
            <button
                onClick={() => setIsEnabled(!isEnabled)}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isEnabled ? 'bg-green-600' : 'bg-gray-300'
                }`}
            >
                <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-300 ${
                        isEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    );
};

const ItemRow: FC<{ name: string; action: string; actionClass?: string; icon?: FC<{className: string}> }> = ({ name, action, actionClass = 'text-green-600', icon: Icon }) => (
    <div className="flex justify-between items-center py-3 px-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition duration-300">
        <span className="text-base font-medium text-gray-800 flex items-center">
            {Icon && <Icon className="w-5 h-5 mr-3 text-gray-400" />}
            {name}
        </span>
        <button className={`text-sm font-bold px-3 py-1 rounded-md transition duration-200 ${
            actionClass.includes('blue') ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 
            actionClass.includes('green') ? 'bg-green-100 text-green-700 hover:bg-green-200' :
            actionClass.includes('yellow') ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' :
            actionClass.includes('red') ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'text-gray-700'
        }`}>
            {action}
        </button>
    </div>
);

const GameControlCenterPanel: FC = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isLevel4Enabled, setIsLevel4Enabled] = useState(true);
    const [phraseScore, setPhraseScore] = useState(50);
    const [section, setSection] = useState('Awareness Score Distribution');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const stateDependentContent = (
        <>
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-600 mb-2">Section Parameter Weighting</label>
                <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full md:w-2/3 lg:w-1/2 px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                    <option>Awareness Score Distribution</option>
                    <option>Empathy Scenario Weight</option>
                    <option>Response Confidence Threshold</option>
                </select>
            </div>

            <div className="mb-8 w-full md:w-2/3 lg:w-1/2">
                <ToggleSwitch 
                    isEnabled={isLevel4Enabled} 
                    setIsEnabled={setIsLevel4Enabled} 
                    label="Enable Level 4 (Complex Peer Pressure)"
                />
            </div>
            
            <div className="mb-10">
                <label className="block text-sm font-medium text-gray-600 mb-4">Phrase Score Distribution</label>
                <div className="flex items-center space-x-6 bg-gray-100 p-4 rounded-xl shadow-inner border border-gray-200">
                    <span className="text-base font-bold text-gray-700 w-8 text-center">0</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={phraseScore}
                        onChange={(e) => setPhraseScore(parseInt(e.target.value))}
                        className="w-full h-3 bg-gray-300 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition [&::-webkit-slider-thumb]:duration-200"
                    />
                    <span className="text-base font-bold text-gray-700 w-8 text-center">100</span>
                </div>
                <div className="text-center mt-3 text-lg font-bold text-blue-600">Current Value: {phraseScore}</div>
            </div>
        </>
    );

    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-extrabold text-gray-800 mb-8 flex items-center border-b pb-4">
                <Settings className="w-6 h-6 mr-3 text-blue-600" />
                Module Parameters
            </h3>
            {isMounted ? stateDependentContent : <div className="h-48 flex items-center justify-center text-gray-400">Loading Configuration...</div>}
            <div className="flex space-x-4 pt-6 border-t border-gray-100 mt-6">
                <button className="flex items-center px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition duration-200">
                    <Save className="w-5 h-5 mr-2" />
                    Save Parameters
                </button>
                <button className="flex items-center px-8 py-3 border border-gray-300 bg-white text-gray-700 font-bold rounded-xl shadow-md hover:bg-gray-50 hover:border-gray-400 transition duration-200">
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset to Default
                </button>
            </div>
        </div>
    );
};

const CustomScenarioManagement: FC = () => {
    const mockScenarios = [
        { name: 'Lunchroom Exclusion', status: 'Active', color: 'text-green-600' },
        { name: 'Online Gossip Incident', status: 'Pending Review', color: 'text-yellow-600' },
        { name: 'Peer Pressure to Cheat', status: 'Draft', color: 'text-gray-500' },
    ];
    
    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Edit3 className="w-5 h-5 mr-3 text-orange-500" />
                Custom Scenario Management
            </h3>
            
            <div className="space-y-4">
                {mockScenarios.map((scenario, index) => (
                    <div key={index} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition duration-200">
                        <span className="text-base font-medium text-gray-800">{scenario.name}</span>
                        <div className="flex space-x-4 items-center">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${scenario.color.replace('text-', 'bg-').replace('-600', '-100')} ${scenario.color}`}>{scenario.status}</span>
                            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                                Edit Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100">
                <button className="flex items-center px-6 py-2 bg-green-600 text-white font-bold rounded-xl shadow-md hover:bg-green-700 transition duration-200">
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Scenario
                </button>
            </div>
        </div>
    );
};

const FeedbackLoopConfiguration: FC = () => {
    const feedbackOptions = [
        { name: 'Immediate Positive Reinforcement', icon: Zap, action: 'Toggle On', actionClass: 'text-green-600' },
        { name: 'Delayed Reflection Prompt (24h)', icon: Clock, action: 'Configure', actionClass: 'text-blue-600' },
        { name: 'Peer Group Comparison Data', icon: Users, action: 'Toggle Off', actionClass: 'text-red-600' },
    ];

    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageSquare className="w-5 h-5 mr-3 text-purple-600" />
                Feedback Loop Configuration
            </h3>
            
            <div className="space-y-3">
                {feedbackOptions.map((item, index) => (
                    <ItemRow 
                        key={index} 
                        name={item.name} 
                        action={item.action} 
                        actionClass={item.actionClass}
                        icon={item.icon}
                    />
                ))}
            </div>
            
        </div>
    );
};

const GameConfigurationPanel: FC = () => {
    
    const difficultySettings = [
        { mode: 'Easy Mode (Foundational)', color: 'text-green-600', desc: 'Focus on basic identification of bullying.' },
        { mode: 'Medium Mode (Application)', color: 'text-yellow-600', desc: 'Requires proactive choice and response.' },
        { mode: 'Hard Mode (Complex Scenarios)', color: 'text-red-600', desc: 'Involves multiple bystanders and unclear motives.' },
    ];

    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Game Configuration: Difficulty Settings</h3>
            
            <div className="grid grid-cols-1 gap-8">
                
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Scenario Complexity Levels</h4>
                    <div className="space-y-3">
                        {difficultySettings.map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-lg transition duration-300">
                                <div className="flex justify-between items-center pb-2">
                                    <span className="text-base font-bold text-gray-800">{item.mode}</span>
                                    <button className={`text-sm font-bold px-3 py-1 rounded-md transition duration-200 ${item.color.includes('green') ? 'bg-green-100 text-green-700 hover:bg-green-200' : item.color.includes('yellow') ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
                                        Configure
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ActiveSessions: FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['active-game-sessions'],
        queryFn: async () => {
            const res = await fetch('/api/teachers/active-sessions');
            if (!res.ok) throw new Error('Failed to fetch sessions');
            return res.json();
        }
    });

    const sessions = data?.sessions || [];

    return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Monitor className="w-5 h-5 mr-3 text-blue-500" />
            Active Monitoring Sessions ({isLoading ? '...' : sessions.length})
        </h3>
        
        {isLoading ? (
            <div className="text-center py-4 text-gray-500">Loading active sessions...</div>
        ) : sessions.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No active game sessions found.</div>
        ) : (
            <div className="space-y-4">
                {sessions.map((session: any) => (
                    <div key={session.id} className="grid grid-cols-6 items-center bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-200">
                        
                        <p className="text-sm font-bold text-gray-800 col-span-2 flex items-center">
                             <Play className="w-4 h-4 mr-1.5 text-green-500" /> {session.game}
                        </p>
                        
                        <p className="text-sm text-gray-600 flex items-center col-span-1">
                            <Users className="w-4 h-4 mr-1.5 text-blue-500" /> {session.class}
                        </p>
                        
                        <div className="text-xs text-gray-600 col-span-2 flex justify-start items-center space-x-4">
                            <span className="flex items-center font-medium">{session.studentName}</span>
                            <span className="text-gray-500">Started: {session.started}</span>
                        </div>
                        
                        <div className="col-span-1 flex justify-end space-x-2">
                            <button className="p-2 text-red-500 hover:text-white hover:bg-red-600 border border-red-500 rounded-lg transition shadow-md" title="Stop Session">
                                <StopCircle className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-white hover:bg-gray-600 border border-gray-500 rounded-lg transition shadow-md" title="Remove">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
    );
};

const ComprehensiveGameControlPage: FC = () => {
    return (
        <div className="min-h-screen bg-[#f3f4f6] py-10">
            <div className="max-w-7xl mx-auto p-8 space-y-10">
                
                <header>
                    <h1 className="text-3xl font-extrabold text-gray-900">Game Control</h1>
                    <p className="text-lg text-gray-600 mt-2">Configure module settings and manage live sessions for student self-awareness.</p>
                </header>

                <GameControlCenterPanel />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <GameConfigurationPanel />
                    <CustomScenarioManagement />
                </div>
                
                <FeedbackLoopConfiguration />

                <ActiveSessions />

            </div>
        </div>
    );
};

export default ComprehensiveGameControlPage;
