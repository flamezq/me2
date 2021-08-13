<?php

namespace admin\modules\warehousemoving\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\ItemJournal;

/**
 * AdjustSearch represents the model behind the search form about `common\models\WarehouseHeader`.
 */
class AdjustSearch extends ItemJournal
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'line_no', 'customer_id', 'district', 'city', 'province', 'postcode', 'user_id', 'comp_id', 'ship_to'], 'integer'],
            [['PostingDate', 'DocumentDate', 'TypeOfDocument', 'SourceDocNo', 'DocumentNo', 'SourceDoc', 'Description', 'address', 'address2', 'contact', 'phone', 'gps', 'update_date', 'status', 'ship_date'], 'safe'],
            [['Quantity'], 'number'],
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
        $query = ItemJournal::find()->where(['comp_id' => Yii::$app->session->get('Rules')['comp_id']]);

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort'=> ['defaultOrder' => ['id'=>SORT_DESC]]
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        // $query->andFilterWhere([
        //     'id' => $this->id,
        //     'line_no' => $this->line_no,
        //     'PostingDate' => $this->PostingDate,
        //     'DocumentDate' => $this->DocumentDate,
        //     'customer_id' => $this->customer_id,
        //     'Quantity' => $this->Quantity,
        //     'district' => $this->district,
        //     'city' => $this->city,
        //     'province' => $this->province,
        //     'postcode' => $this->postcode,
        //     'update_date' => $this->update_date,
        //     'user_id' => $this->user_id,
        //     'comp_id' => $this->comp_id,
        //     'ship_to' => $this->ship_to,
        //     'ship_date' => $this->ship_date,
        // ]);

        $query->andFilterWhere(['like', 'TypeOfDocument', $this->TypeOfDocument])
            ->andFilterWhere(['like', 'SourceDocNo', $this->SourceDocNo])
            ->andFilterWhere(['like', 'DocumentNo', $this->DocumentNo])
            ->andFilterWhere(['like', 'SourceDoc', $this->SourceDoc])
            ->andFilterWhere(['like', 'Description', $this->Description])
            ->andFilterWhere(['like', 'status', $this->status]);

        return $dataProvider;
    }
}
