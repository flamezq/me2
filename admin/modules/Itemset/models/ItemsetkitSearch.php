<?php

namespace admin\modules\Itemset\models;

use Yii;
 

use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\Itemset;


/**
 * ItemsetSearch represents the model behind the search form about `common\models\Itemset`.
 */
class ItemsetkitSearch extends Itemset
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'user_id', 'comp_id'], 'integer'],
            [['detail'],'string'],
            [['name'], 'safe'],
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
        
        $query = Itemset::find();
        //$query->select('*');
        //$query->from('itemset');
        $query->leftJoin('kitbom_header', '(itemset.id IN (kitbom_header.item_set))');
       

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
            'id' => $this->id
        ]);

        $query->andFilterWhere(['like', 'itemset.name', $this->name])
        ->andFilterWhere(['like', 'itemset.detail', $this->detail]);

        return $dataProvider;
    }
}
