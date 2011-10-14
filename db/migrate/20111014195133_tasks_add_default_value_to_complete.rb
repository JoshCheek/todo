class TasksAddDefaultValueToComplete < ActiveRecord::Migration
  def self.up
    change_column_default :tasks, :complete, false
  end

  def self.down
  end
end
