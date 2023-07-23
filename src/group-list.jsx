import React, { useState } from 'react';

const GroupList = ({ groups, setGroups, onItemClick, onGroupAdd, onItemChange }) => {
    const [selectedGroup, setSelectedGroup] = useState('');
    const [newGroupName, setNewGroupName] = useState('');
    const [
            isModalOpen, setModalOpen
    ] = useState(false);
    const [
        isItemModalOpen, setItemModalOpen
    ] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Corrected line
    const [newItem, setNewItem] = useState({
        name: '',
        id: '',
        ip: '',
        port: '',
        pwd: '',
    });

    const addGroup = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setNewGroupName('');
    };

    const closeItemModal = () => {
        setItemModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newGroupName) {
            const newGroup = { id: groups.length + 1, name: newGroupName, items: [] };
            setGroups([...groups, newGroup]);
            closeModal();
            // 새로운 그룹 추가 시, 상위 컴포넌트에 추가된 그룹 정보 전달
            onGroupAdd(newGroup);
        }
    };

    const deleteGroup = () => {
        if (selectedGroup) {
            const updatedGroups = groups.filter((group) => group.id !== selectedGroup);
            setGroups(updatedGroups);
            setSelectedGroup('');
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        onItemClick(item); // 아이템 클릭 시, 상위 컴포넌트에 선택된 아이템 전달
    };


    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleItemSubmit = (e) => {
        e.preventDefault();
        if (selectedGroup && newItem.name && newItem.ip && newItem.port && newItem.pwd) {
            const updatedGroups = groups.map((group) => {
                if (group.id === selectedGroup) {
                    const newItemWithId = { ...newItem, id: group.items.length + 1 };
                    return { ...group, items: [...group.items, newItemWithId] };
                }
                return group;
            });

            setGroups(updatedGroups);
            handleItemModalClose(); // Close the item modal after submitting
        }
    };
    const handleItemModalOpen = () => {
        setNewItem({
            name: '',
            id: '',
            ip: '',
            port: '',
            pwd: '',
        });
        setItemModalOpen(true);
    };
    const handleItemModalClose = () => {
        setItemModalOpen(false);
        setNewItem({
            name: '',
            id: '',
            ip: '',
            port: '',
            pwd: '',
        });
    };
    return (
        <div>
            <h2>그룹 리스트</h2>
            <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(parseInt(e.target.value))}
            >
                <option value="">선택하세요</option>
                {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                        {group.name}
                    </option>
                ))}
            </select>
            <br />
            <button onClick={addGroup}>추가</button>
            <button onClick={deleteGroup}>삭제</button>


            {selectedGroup && (
                <div>
                    <h3>{groups.find((group) => group.id === selectedGroup).name} 목록</h3>
                    <ul>
                        {groups.find((group) => group.id === selectedGroup).items.map((item) => (
                            <li key={item.id} onClick={() => handleItemClick(item)}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleItemModalOpen}>아이템 추가</button>
                </div>
            )}
            {isModalOpen && (
                <div>
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
                            <h3>새로운 그룹 추가</h3>
                            <form onSubmit={handleSubmit}>
                                <input type="text" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
                                <br />
                                <button type="submit">추가</button>
                                <button type="button" onClick={closeModal}>취소</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {isItemModalOpen && (
                <div>
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
                            <h3>새로운 아이템 추가</h3>
                            <form onSubmit={handleItemSubmit}>
                                <label>
                                    이름:
                                    <input type="text" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                                </label>
                                <br />
                                <label>
                                    IP:
                                    <input type="text" value={newItem.ip} onChange={(e) => setNewItem({ ...newItem, ip: e.target.value })} />
                                </label>
                                <br />
                                <label>
                                    Port:
                                    <input type="text" value={newItem.port} onChange={(e) => setNewItem({ ...newItem, port: e.target.value })} />
                                </label>
                                <br />
                                <label>
                                    Password:
                                    <input type="text" value={newItem.pwd} onChange={(e) => setNewItem({ ...newItem, pwd: e.target.value })} />
                                </label>
                                <br />
                                <button type="submit">추가</button>
                                <button type="button" onClick={handleItemModalClose}>취소</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupList;
