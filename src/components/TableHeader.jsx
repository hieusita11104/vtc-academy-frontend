import React from "react";
import { Input, Dropdown, Button, Menu, Checkbox, Switch, Space, Popconfirm } from "antd";
import { FaFilter, FaEllipsisH, FaList, FaTh } from "react-icons/fa";

const TableHeader = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  selectedRowKeys,
  handleBulkDelete,
  handleBulkStatusChange,
  viewMode,
  setViewMode,
  showModal,
  statusOptions,
}) => {
  const filterMenu = (
    <Menu>
      <Menu.ItemGroup title="Filter by Status">
        {statusOptions.map((status) => (
          <Menu.Item key={`status-${status}`}>
            <Checkbox
              checked={filters.status.includes(status)}
              onChange={(e) => {
                const newStatusFilters = e.target.checked
                  ? [...filters.status, status]
                  : filters.status.filter((s) => s !== status);
                setFilters({ ...filters, status: newStatusFilters });
              }}
            >
              {status}
            </Checkbox>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );

  const bulkActionsMenu = (
    <Menu>
      <Menu.Item key="delete">
        <Popconfirm
          title="Are you sure to delete selected patients?"
          onConfirm={handleBulkDelete}
        >
          Delete Selected
        </Popconfirm>
      </Menu.Item>
      <Menu.SubMenu title="Change Status">
        {statusOptions.map((status) => (
          <Menu.Item
            key={`bulk-status-${status}`}
            onClick={() => handleBulkStatusChange(status)}
          >
            {status}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <div className="table-header">
      <Space>
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Dropdown overlay={filterMenu} trigger={["click"]}>
          <Button>
            Filter <FaFilter style={{ marginLeft: 8 }} />
          </Button>
        </Dropdown>
        {selectedRowKeys.length > 0 && (
          <Dropdown overlay={bulkActionsMenu} trigger={["click"]}>
            <Button>
              Bulk Actions <FaEllipsisH style={{ marginLeft: 8 }} />
            </Button>
          </Dropdown>
        )}
      </Space>

      <Space>
        <div className="view-mode-switch">
          <Switch
            checkedChildren={<FaTh />}
            unCheckedChildren={<FaList />}
            checked={viewMode === "card"}
            onChange={(checked) => setViewMode(checked ? "card" : "list")}
          />
        </div>
        <Button type="primary" onClick={() => showModal()} className="add-button">
          Add Patient
        </Button>
      </Space>
    </div>
  );
};

export default TableHeader;