<?php

namespace admin\modules\vattype\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\VatType;

/**
 * SearchVatType represents the model behind the search form about `common\models\VatType`.
 */
class SearchVatType extends VatType
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'vat_value', 'comp_id'], 'integer'],
            [['name', 'description'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = VatType::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'vat_value' => $this->vat_value,
            'comp_id' => $this->comp_id,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'description', $this->description]);

        return $dataProvider;
    }
}
