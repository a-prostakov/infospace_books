# == Schema Information
#
# Table name: tag_connections
#
#  id          :integer          not null, primary key
#  entity_type :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  entity_id   :integer          not null
#  tag_id      :integer          not null
#
# Indexes
#
#  index_tag_connections_on_entity_type_and_entity_id_and_tag_id  (entity_type,entity_id,tag_id) UNIQUE
#  index_tag_connections_on_tag_id                                (tag_id)
#
FactoryBot.define do
  factory :tag_connection, class: 'TagConnection' do
  end
end
