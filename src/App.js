import React, { useState } from 'react';
import GroupList from './group-list';

const App = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const initialItems = [
        { id: 1, groupsId: 1, name: '아이템 1', ip: '192.168.0.1', port: 8080, pwd: 'password1' },
        { id: 2, groupsId: 1, name: '아이템 2', ip: '192.168.0.2', port: 8081, pwd: 'password2' },
        { id: 3, groupsId: 1, name: '아이템 3', ip: '192.168.0.3', port: 8082, pwd: 'password3' },
    ];
    const [groups, setGroups] = useState([
        { id: 1, name: '그룹 1', items: initialItems },
        { id: 2, name: '그룹 2', items: [] },
        { id: 3, name: '그룹 3', items: [] },
    ]);
    const handleGroupAdd = (newGroup) => {
        // 새로운 그룹을 추가할 때, 기존 그룹 목록에 추가
        setGroups([...groups, newGroup]);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item); // Update the selectedItem state with the clicked item
    };
    const handleItemChange = (updatedItem) => {
        const updatedGroups = groups.map((group) => {
            if (group.id === updatedItem.groupId) {
                const updatedItems = group.items.map((item) =>
                    item.id === updatedItem.id ? updatedItem : item
                );
                return { ...group, items: updatedItems };
            }
            return group;
        });

        setGroups(updatedGroups);
        setSelectedItem(updatedItem);
    };

    const handleSetItem = () => {
        console.log(selectedItem)
        setSelectedItem({ ...selectedItem, isEditMode: false });
        for (const group of groups) {
            debugger;
            if (group.id === selectedItem.groupsId) {
                debugger;
                const updatedItems = group.items.map((item) =>
                    item.id === selectedItem.id ? { ...selectedItem, isEditMode: false } : item
                );
                setGroups([{ ...group, items: updatedItems }]);
            }
        }
    }
    return (
        <div>
            <h1>웹 화면</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    {/* 왼쪽 영역 */}
                    <GroupList
                        groups={groups}
                        setGroups={setGroups}
                        onItemClick={handleItemClick}
                        onGroupAdd={handleGroupAdd}
                        onItemChange={handleItemChange} />
                </div>
                <div style={{ flex: 1 }}>
                    {/* 오른쪽 영역 */}
                    {selectedItem && (
                        <div>
                            <h3>선택된 아이템 정보</h3>
                            {/* 수정 모드일 때는 입력 필드를 보여주고, 아닐 때는 텍스트로 보여줌 */}
                            {selectedItem.isEditMode ? (
                                <div>
                                    <input
                                        type="text"
                                        value={selectedItem.name}
                                        onChange={(e) =>
                                            setSelectedItem({
                                                ...selectedItem,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        value={selectedItem.id}
                                        onChange={(e) =>
                                            setSelectedItem({
                                                ...selectedItem,
                                                id: e.target.value,
                                            })
                                        }
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        value={selectedItem.ip}
                                        onChange={(e) =>
                                            setSelectedItem({
                                                ...selectedItem,
                                                ip: e.target.value,
                                            })
                                        }
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        value={selectedItem.port}
                                        onChange={(e) =>
                                            setSelectedItem({
                                                ...selectedItem,
                                                port: e.target.value,
                                            })
                                        }
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        value={selectedItem.pwd}
                                        onChange={(e) =>
                                            setSelectedItem({
                                                ...selectedItem,
                                                pwd: e.target.value,
                                            })
                                        }
                                    />
                                    <br />
                                    <button onClick={handleSetItem}>
                                        저장하기
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p>이름: {selectedItem.name}</p>
                                    <p>ID: {selectedItem.id}</p>
                                    <p>IP: {selectedItem.ip}</p>
                                    <p>Port: {selectedItem.port}</p>
                                    <p>Password: {selectedItem.pwd}</p>
                                    <button onClick={() => setSelectedItem({ ...selectedItem, isEditMode: true })}>
                                        수정하기
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
